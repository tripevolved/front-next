import Image from 'next/image'

export default function TripEvolvedSection() {
  return (
    <section className="py-24 bg-secondary-500 text-white">
      <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
              Por que existimos
            </h2>
            <p className="font-comfortaa text-lg">
              A Trip Evolved nasceu através da inquietude de seus membros quanto à falta de personalização do mercado de viagens.
            </p>
            <p className="font-comfortaa text-lg mt-4">
              Assim como milhares de viajantes ao redor do mundo, acreditamos que viagens são experiências únicas, frutos de sonhos individuais, e que merecem ser tratadas dessa maneira.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/brand/logo-principal.svg"
              alt="Trip Evolved Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 