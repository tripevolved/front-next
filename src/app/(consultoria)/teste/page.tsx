import CruiseImageCarousel from "@/components/cruises/CruiseImageCarousel";
import Image from "next/image";

export default function CruiseOverview() {
  return (
    <>
      <section className="flex flex-col gap-6">
        <section className="flex flex-col gap-4 w-full p-3 bg-secondary-500">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl">
              <CruiseImageCarousel />
            </div>g
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-lg">Explora Journeys</h2>
            <h1 className="text-accent-500 text-xl font-bold">Nice - Roma: Uma Jornada incrível</h1>
            <span className="text-white">De 12 a 20 de abril de 2026</span>
          </div>
        </section>
        <section className="px-3 flex w-full justify-center items-center">
          <div className="bg-primary-50 max-w-3xl  border-2 border-primary-500 p-3 md:px-4 px-2 flex items-center justify-center text-center flex-wrap whitespace-pre-line gap-6 rounded-[40px]">
            <span className="text-gray-600 text-md italic">
              &quot;Essa jornada combina toda a grandiosidade e cuidado Explora Journeys com as
              paisagens perfeitas e espetaculares de Roma e Nice. Perfeita para curtir a dois&quot;
            </span>
            <div className="flex justify-around items-center gap-3">
              <Image
                src="/assets/sobre/gasp.png"
                alt="Decorative element"
                width={30}
                height={30}
                className="lg:w-24 lg:h-24 h-[68px] w-[68px] object-cover rounded-full"
              />
              <span className="text-black font-extrabold">
                Henrique Gasparotto, especialista Trip Evolved
              </span>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
