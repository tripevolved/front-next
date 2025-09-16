import Button from "../common/Button";

export const CruiseCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg h-96 w-full flex flex-col gap-5 p-4">
      <div className="h-52 bg-red-600">
        <h1 className="text-white flex justify-center items-center h-full">CARROSSEL DE IMAGENS</h1>
      </div>
      <div>
        <p className="text-gray-600 text-lg">Explora Journeys</p>
      </div>
      <div className="flex flex-col w-full items-start gap-4">
        <button className="underline text-3xl text-primary-500 font-bold" type="button">
          Nice - Roma: Uma Jornada Incrível
        </button>
        <div>
          <p>Ocean Terrace Suite a partir de R$X,00</p>
          <p>De 12 a 20 de abril de 2026</p>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Button className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-2xl text-2xl font-semibold hover:bg-accent-600 transition-all w-9/12">
          Quero saber mais
        </Button>
      </div>
    </div>
  );
};
