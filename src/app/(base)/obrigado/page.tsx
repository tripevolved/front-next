import Link from 'next/link'

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="w-full md:w-[80%] max-w-2xl mx-auto px-4 text-center">
        <h1 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
          Obrigado!
        </h1>
        <p className="text-secondary-600 font-comfortaa text-lg mb-8">
          Seu contato foi recebido com sucesso e nossos especialistas vão entrar em contato com você em breve. Enquanto isso, conheça o Círculo Evolved e descubra o que <span className="font-bold text-accent-600">transparência e curadoria</span> podem fazer pelas suas próximas viagens.
        </p>
        <Link
          href="/circulo-evolved"
          className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-600 transition-all"
        >
          Conhecer o Círculo Evolved
        </Link>
      </div>
    </div>
  )
} 