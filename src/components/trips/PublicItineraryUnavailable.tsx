import Image from "next/image";

const ERROR_STATE_IMAGE = "/assets/states/error-state.svg";

export function PublicItineraryUnavailable() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4 py-16">
      <Image src={ERROR_STATE_IMAGE} alt="" width={240} height={240} className="object-contain" />
      <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">Itinerário indisponível</h1>
      <p className="font-comfortaa text-sm text-secondary-600 max-w-md">
        Este link pode ter expirado ou o itinerário ainda não foi publicado.
      </p>
    </div>
  );
}
