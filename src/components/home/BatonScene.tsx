"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, ContactShadows } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

/*
 * Baton procedural: um bastão de chocolate (LatheGeometry) envolto por uma
 * embalagem dividida em "pétalas". A cada frame as pétalas são deformadas na
 * CPU — acima da linha de rasgo elas se curvam para fora e para baixo, como
 * uma casca — a partir do progresso de scroll recebido por ref.
 */

const BAR_R = 0.4;
const BAR_H = 3.4;
const WRAP_R = 0.445;
const WRAP_BOTTOM = -BAR_H / 2 - 0.08;
const WRAP_TOP = BAR_H / 2 + 0.06;
const WRAP_H = WRAP_TOP - WRAP_BOTTOM;
const PEEL_LEN = WRAP_H * 0.56; // a base continua embrulhada, como na mão
const PETALS = 4;
const SEG_U = 14;
const SEG_V = 90;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function useWrapperTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 1024;
    const g = c.getContext("2d")!;
    // u (largura) = circunferência, v (altura) = comprimento do bastão
    g.fillStyle = "#E30613";
    g.fillRect(0, 0, 1024, 1024);
    // faixas amarelas onduladas nas pontas
    g.fillStyle = "#FFCB05";
    for (const y0 of [0, 1024]) {
      g.beginPath();
      g.moveTo(0, y0);
      for (let x = 0; x <= 1024; x += 16) {
        const dir = y0 === 0 ? 1 : -1;
        g.lineTo(x, y0 + dir * (120 + Math.sin((x / 1024) * Math.PI * 6) * 22));
      }
      g.lineTo(1024, y0);
      g.closePath();
      g.fill();
    }
    // pontinhos da identidade de campanha
    g.fillStyle = "rgba(255,255,255,0.08)";
    for (let y = 150; y < 880; y += 26) for (let x = (y / 26) % 2 ? 13 : 0; x < 1024; x += 26) g.fillRect(x, y, 5, 5);
    // logotipo repetido ao redor, correndo ao longo do bastão
    const drawLabel = (cx: number) => {
      g.save();
      g.translate(cx, 512);
      g.rotate(-Math.PI / 2);
      g.font = "italic 900 150px 'Baloo 2', 'Arial Black', sans-serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.lineWidth = 16;
      g.strokeStyle = "#8f0009";
      g.strokeText("Baton", 0, 0);
      g.fillStyle = "#FFFFFF";
      g.fillText("Baton", 0, 0);
      g.font = "italic 800 54px 'Baloo 2', sans-serif";
      g.fillStyle = "#FFCB05";
      g.fillText("Garoto", 0, 108);
      g.restore();
    };
    drawLabel(256);
    drawLabel(768);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

function useFoilTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const g = c.getContext("2d")!;
    const img = g.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 128 + (Math.random() - 0.5) * 60;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 8);
    return tex;
  }, []);
}

function ChocolateBar() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const cap = BAR_R * 0.9;
    pts.push(new THREE.Vector2(0, -BAR_H / 2));
    for (let i = 0; i <= 8; i++) {
      const a = (i / 8) * (Math.PI / 2);
      pts.push(new THREE.Vector2(Math.sin(a) * BAR_R, -BAR_H / 2 + cap * 0.35 * (1 - Math.cos(a))));
    }
    for (let i = 0; i <= 20; i++) {
      const a = (i / 20) * (Math.PI / 2);
      pts.push(new THREE.Vector2(Math.cos(a) * BAR_R, BAR_H / 2 - cap + Math.sin(a) * cap));
    }
    const g = new THREE.LatheGeometry(pts, 96);
    // caneluras sutis ao longo do bastão
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const r = Math.hypot(x, z);
      if (r < 1e-4) continue;
      const k = 1 + Math.cos(Math.atan2(z, x) * 12) * 0.01;
      p.setX(i, x * k);
      p.setZ(i, z * k);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} castShadow>
      <meshPhysicalMaterial
        color="#5b2b16"
        roughness={0.42}
        clearcoat={0.65}
        clearcoatRoughness={0.28}
        sheen={0.4}
        sheenColor="#a0613a"
      />
    </mesh>
  );
}

type PetalProps = {
  index: number;
  progress: MutableRefObject<number>;
  outer: THREE.Material;
  inner: THREE.Material;
};

function Petal({ index, progress, outer, inner }: PetalProps) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = (SEG_U + 1) * (SEG_V + 1);
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    const uv = new Float32Array(n * 2);
    const idx: number[] = [];
    for (let j = 0; j <= SEG_V; j++) {
      for (let i = 0; i <= SEG_U; i++) {
        const k = j * (SEG_U + 1) + i;
        uv[k * 2] = (index + i / SEG_U) / PETALS;
        uv[k * 2 + 1] = j / SEG_V;
        if (i < SEG_U && j < SEG_V) {
          const a = k;
          const b = k + 1;
          const c = k + SEG_U + 1;
          const d = c + 1;
          idx.push(a, b, c, b, d, c);
        }
      }
    }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    g.setIndex(idx);
    return g;
  }, [index]);

  const last = useRef(-1);

  useFrame(() => {
    // cada pétala começa um pouco depois da anterior
    const delay = index * 0.06;
    const p = clamp01((progress.current - delay) / (1 - delay * PETALS * 0.5));
    if (Math.abs(p - last.current) < 1e-4) return;
    last.current = p;

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const hinge = WRAP_TOP - p * PEEL_LEN;
    // dobra apertada e a casca pendendo quase reta, levemente aberta — como banana
    const bendR = THREE.MathUtils.lerp(0.1, 0.2, p);
    const hang = 0.78 + ((index * 0.37) % 1) * 0.1;
    const maxT = Math.PI * THREE.MathUtils.lerp(0.4, hang, smooth(0, 0.45, p));
    const gap = 0.004; // fresta mínima entre pétalas
    const phi0 = (index / PETALS) * Math.PI * 2 + gap;
    const dPhi = (Math.PI * 2) / PETALS - gap * 2;

    for (let j = 0; j <= SEG_V; j++) {
      const y = WRAP_BOTTOM + (j / SEG_V) * WRAP_H;
      for (let i = 0; i <= SEG_U; i++) {
        const k = j * (SEG_U + 1) + i;
        const u = i / SEG_U;
        // pétalas se abrem em leque conforme descascam
        // a pétala afina conforme se solta, separando-se das vizinhas
        const taper = y > hinge ? 1 - 0.5 * smooth(0, 0.9, y - hinge) : 1;
        const phi = phi0 + dPhi * (0.5 + (u - 0.5) * taper);
        let r = WRAP_R;
        let yy = y;
        // bordas levemente arredondadas: a casca não é perfeitamente cilíndrica
        const edge = Math.sin(u * Math.PI);
        if (y > hinge) {
          const d = y - hinge;
          const sArc = maxT * bendR;
          let dr: number;
          if (d <= sArc) {
            const t = d / bendR;
            dr = bendR * (1 - Math.cos(t));
            yy = hinge + bendR * Math.sin(t);
          } else {
            const e = d - sArc;
            dr = bendR * (1 - Math.cos(maxT)) + e * Math.sin(maxT);
            yy = hinge + bendR * Math.sin(maxT) + e * Math.cos(maxT);
          }
          // a ponta da casca enrola um pouco para dentro
          dr += Math.sin(Math.min(d * 1.8, Math.PI)) * 0.03 * edge;
          // as bordas da pétala se fecham um pouco, dando volume de papel
          dr -= (1 - edge) * Math.min(d, 0.6) * 0.12;
          r += dr;
        } else if (y > WRAP_TOP - 0.18 && p < 0.02) {
          // fechamento "franzido" do topo antes de abrir
          const t = (y - (WRAP_TOP - 0.18)) / 0.18;
          r *= 1 - t * 0.55;
        }
        pos.setXYZ(k, Math.sin(phi) * r, yy, Math.cos(phi) * r);
      }
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
  });

  return (
    <group>
      <mesh geometry={geo} material={outer} castShadow />
      <mesh geometry={geo} material={inner} />
    </group>
  );
}

function Baton({ progress }: { progress: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const smoothP = useRef(0);
  const peel = useRef(0);
  const map = useWrapperTexture();
  const foil = useFoilTexture();
  const outer = useMemo(
    () => new THREE.MeshStandardMaterial({ map, metalness: 0.35, roughness: 0.32, side: THREE.FrontSide }),
    [map],
  );
  const inner = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f4f4f7",
        metalness: 0.75,
        roughness: 0.32,
        bumpMap: foil,
        bumpScale: 0.35,
        side: THREE.BackSide,
      }),
    [foil],
  );
  const { camera, size } = useThree();

  useLayoutEffect(() => () => {
    outer.dispose();
    inner.dispose();
  }, [outer, inner]);

  useFrame((state, dt) => {
    const target = progress.current;
    smoothP.current = THREE.MathUtils.damp(smoothP.current, target, 6, dt);
    const p = smoothP.current;
    peel.current = smooth(0.06, 0.8, p);
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = t * 0.15 + p * Math.PI * 1.35;
    g.rotation.z = THREE.MathUtils.lerp(-0.42, 0.08, smooth(0, 0.7, p));
    g.rotation.x = THREE.MathUtils.lerp(0.18, 0.05, p);
    g.position.y = THREE.MathUtils.lerp(-0.1, 0.35, smooth(0.2, 1, p));
    // no desktop o bastão fica à direita do texto; no mobile, centralizado e mais longe
    const narrow = size.width < size.height;
    g.position.x = narrow ? 0 : Math.min(1.4, (size.width / size.height) * 0.75);
    const baseZ = narrow ? 10.5 : 7.8;
    camera.position.z = THREE.MathUtils.lerp(baseZ, baseZ + 0.6, smooth(0.3, 1, p));
    camera.position.y = THREE.MathUtils.lerp(0.6, 1.1, p);
    camera.lookAt(0, 0.3, 0);
  });

  return (
    <group ref={group}>
      <ChocolateBar />
      {Array.from({ length: PETALS }, (_, i) => (
        <Petal key={i} index={i} progress={peel} outer={outer} inner={inner} />
      ))}
    </group>
  );
}

function Sprinkles() {
  const items = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 2.4 + (i % 3) * 0.6;
        return {
          pos: [Math.cos(a) * r, ((i * 37) % 7) / 2 - 1.6, Math.sin(a) * r - 1.5] as [number, number, number],
          color: ["#FFCB05", "#E30613", "#4FB3E8", "#6FB843"][i % 4],
          scale: 0.07 + (i % 4) * 0.025,
        };
      }),
    [],
  );
  return (
    <>
      {items.map((it, i) => (
        <Float key={i} speed={1.5 + (i % 3)} rotationIntensity={2} floatIntensity={1.5}>
          <mesh position={it.pos} scale={it.scale}>
            <capsuleGeometry args={[0.5, 1.4, 4, 12]} />
            <meshStandardMaterial color={it.color} roughness={0.4} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function BatonScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      fallback={<div className="grid h-full place-items-center text-choco">Seu navegador não suporta 3D.</div>}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#ffd9a0" />
      <Environment resolution={256}>
        <color attach="background" args={["#7a5a2c"]} />
        <Lightformer form="rect" intensity={3} position={[0, 3, 4]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#FFCB05" position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ff6b6b" position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 5, -3]} scale={2} />
      </Environment>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <Baton progress={progress} />
      </Float>
      <Sprinkles />
      <ContactShadows position={[0, -2.6, 0]} opacity={0.35} scale={8} blur={2.6} far={4} color="#7a3e1d" />
    </Canvas>
  );
}
