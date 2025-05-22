import { ProfileEnum } from "@/profile.enum";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ name: ProfileEnum }> }) {
  const { name } = await params;

  const mapperFormattedProfileName = new Map<ProfileEnum, string>([
    [ProfileEnum.ADVENTURER, "Aventureiro"],
    [ProfileEnum.GASTRONOMIC, "Gastronômico"],
    [ProfileEnum.INTELECTUAL, "Intelectual"],
    [ProfileEnum.JUST_LIVE_ONCE, "Só se vive uma vez"],
    [ProfileEnum.RELAX, "Relax"],
    [ProfileEnum.ROUTINE_FAN, "Fã da rotina"],
    [ProfileEnum.SPIRITUAL, "Espiritual"],
    [ProfileEnum.ALTERNATIVE, "Alternativo"],
    [ProfileEnum.DYNAMIC, "Dinâmico"],
    [ProfileEnum.GUARANTEEED, "Garantido"],
    [ProfileEnum.INSACIABLE, "Insaciável"],
  ]);

  const formattedName = mapperFormattedProfileName.get(name);

  return (
    <>
      <div className="w-screen min-h-screen bg-primary-500">
        <section className="relative w-full mx-auto lg:h-screen text-white flex flex-col items-center justify-end">
          <div className="flex flex-col items-center gap-2 lg:gap-[50px] pt-8">
            <span className="text-xl lg:text-3xl">O seu perfil de viajante é...</span>
            <div className="relative w-[300px] h-[250px] lg:w-[600px] lg:h-[350px] flex items-end">
              <Image
                src={`/assets/perfil/${name}.svg`}
                alt={`Imagem do perfil ${name}`}
                fill
                priority
              />
            </div>
          </div>
          <div className="bg-white rounded-t-[50px] flex flex-col items-center gap-6 py-16 w-80 lg:w-[75%] lg:h-[400px]">
            <h1 className="text-primary-500 font-bold text-2xl lg:text-3xl">
              {formattedName ?? name}
            </h1>
            <div className="flex flex-col gap-4 text-sm lg:text-base text-gray-500 text-left px-5 lg:px-10 font-baloo">
              <span>Você não perde nenhuma atração turística do destino que está visitando.</span>
              <span>
                Para você, a viagem é uma oportunidade única de visitar todos os monumentos
                históricos e pontos turísticos famosos e não importa quantas horas você precise
                caminhar ou filas que precise enfrentar.
              </span>
              <span>
                Seu objetivo é explorar cada canto da cidade e aproveitar ao máximo cada segundo da
                estadia.
              </span>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2.5 min-h-12 mb-2 me-2 rounded-3xl border border-primary-700 text-primary-700 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-primary-500/15 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              Compartilhar
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
