import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-garoto-yellow px-6 pt-28 text-center">
      <div>
        <p className="label-caps text-[30vw] leading-none text-garoto-red md:text-[14rem]">404</p>
        <h1 className="font-round text-4xl font-extrabold italic">Esse bombom já foi comido.</h1>
        <div className="mt-8">
          <Button href="/">Voltar para o início</Button>
        </div>
      </div>
    </section>
  );
}
