export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-baloo text-5xl md:text-7xl font-bold mb-6">
            Sua Jornada Começa Aqui
          </h1>
          <p className="font-comfortaa text-xl md:text-2xl mb-8">
            Descubra experiências de viagem personalizadas feitas especialmente para você
          </p>
          <button className="font-baloo bg-white text-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all">
            Comece a Planejar
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-center mb-12 text-primary-900">
            Por Que Nos Escolher
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Experiências Personalizadas',
                description: 'Planos de viagem adaptados aos seus gostos e estilo'
              },
              {
                title: 'Orientação Especializada',
                description: 'Especialistas em viagens para guiá-lo em cada etapa'
              },
              {
                title: 'Planejamento Simplificado',
                description: 'Organização de viagem sem complicações do início ao fim'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white border border-primary-100">
                <h3 className="font-baloo text-xl font-semibold mb-4 text-primary-700">{feature.title}</h3>
                <p className="font-comfortaa text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6 text-primary-900">
            Pronto para Começar Sua Aventura?
          </h2>
          <p className="font-comfortaa text-xl text-primary-700 mb-8">
            Deixe-nos ajudar a criar memórias inesquecíveis
          </p>
          <button className="font-baloo bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-all">
            Começar Agora
          </button>
        </div>
      </section>
    </div>
  )
} 