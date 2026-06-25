import Link from 'next/link';

export function DestinationCirculoEvolvedFooter() {
  return (
    <section className="py-20 bg-primary-50">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
        <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-primary-900">
          Tenha acesso à nossa curadoria completa no Círculo Evolved
        </h2>
        <p className="text-primary-700 font-comfortaa text-lg mb-10 max-w-3xl mx-auto">
          Além de tarifas exclusivas e sem comissão, que antes eram restritas às agências de viagem.
        </p>
        <Link
          href="/circulo-evolved"
          className="inline-block font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all"
        >
          Quero fazer parte
        </Link>
      </div>
    </section>
  );
}
