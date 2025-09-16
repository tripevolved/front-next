import Image from "next/image";
import Button from "../common/Button";

export const CruiseCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg h-full w-full flex flex-col gap-5 p-5">
      <div className="h-96">
        <Image
          src="/assets/home/cruzeiros-extraordinarios.jpg"
          alt="Cruzeiros extraordinários com a Trip Evolved"
          className="object-cover h-full w-full rounded-xl"
          priority
          width="150"
          height="100"
          style={{
            position: "static",
          }}
          sizes="100vw"
          quality={90}
        />
      </div>
      <div>
        <p className="text-gray-600 text-xl font-bold">Explora Journeys</p>
      </div>
      <div className="flex flex-col w-full items-start gap-4">
        <button className="underline text-3xl text-primary-500 font-bold" type="button">
          Nice - Roma: Uma Jornada Incrível
        </button>
        <div>
          <p className="md:text-xl">
            <span className="font-extrabold italic">Ocean Terrace Suite</span> a partir de{" "}
            <span className="text-gray-800 font-bold">R$</span>
            <span className="text-primary-500 font-bold">X,00</span>
          </p>
          <p className="md:text-lg">
            De <span className="text-primary-500 font-bold">12</span> a{" "}
            <span className="text-primary-500 font-bold">20</span> de abril de{" "}
            <span className="font-extrabold">2026</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Button className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-2xl text-2xl font-semibold hover:bg-accent-600 transition-all w-11/12">
          Quero saber mais
        </Button>
      </div>
    </div>
  );
};
