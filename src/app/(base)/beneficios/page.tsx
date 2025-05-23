import Image from 'next/image'
import Link from 'next/link'

export default function BeneficiosPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[500px] bg-secondary-500 text-white text-center py-20 lg:py-32">
        <div className="absolute top-1/2 left-[calc(50vw-10px)] lg:left-[calc(50vw+330px)] -translate-y-1/2 z-10">
          <Image
            src="/assets/sobre/hero-2.png"
            alt="Decorative element"
            width={170}
            height={170}
            className="lg:w-auto lg:h-auto"
          />
        </div>
        <div className="absolute top-1/2 right-[calc(50vw-40px)] lg:right-[calc(50vw+250px)] -translate-y-1/2 z-10">
          <Image
            src="/assets/sobre/hero-1.png"
            alt="Decorative element"
            width={200}
            height={200}
            className="lg:w-auto lg:h-auto"
          />
        </div>
        <div className="container md:w-[60%] mx-auto px-4 relative z-20 flex flex-col justify-end min-h-[400px]">
          <div className="text-6xl mb-6">🏕️</div>
          <h1 className="text-4xl md:text-5xl font-baloo font-bold">
            Acreditamos que viagens são <span className="text-accent-500">experiências únicas</span>
          </h1>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Assistência 24/7 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Assistência 24/7
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Suporte completo durante toda a sua viagem, com atendimento em português e uma equipe pronta para resolver qualquer imprevisto.
              </p>
            </div>

            {/* Organização */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Organização
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Cuidamos de toda a burocracia da sua viagem, desde documentos necessários como vistos até comprovantes de vacinas, garantindo que você viaje com tranquilidade e segurança.
              </p>
            </div>

            {/* Economia de Tempo */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Economia de Tempo
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Nossa tecnologia e expertise garantem que você não perca tempo pesquisando e planejando. Nós cuidamos de tudo para que você aproveite ao máximo sua viagem.
              </p>
            </div>

            {/* Experiências Exclusivas */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Experiências Exclusivas
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Acesso a experiências que não estão disponíveis ao público em geral, criadas especialmente para o seu perfil de viajante.
              </p>
            </div>

            {/* Garantia de Qualidade */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Garantia de Qualidade
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Visitamos e avaliamos pessoalmente os hotéis, restaurantes e atrações que recomendamos, garantindo experiências de alta qualidade.
              </p>
            </div>

            {/* Curadoria por Especialistas */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-baloo font-bold text-secondary-900 mb-4">
                Curadoria por Especialistas
              </h3>
              <p className="text-secondary-600 font-comfortaa">
                Nossa equipe de especialistas conhece em profundidade cada destino e seleciona cuidadosamente os melhores parceiros locais para garantir uma experiência autêntica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist & Who We Are Section */}
      <section className="py-20 bg-primary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Why We Exist */}
            <div>
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-6">
                Por que <span className="text-primary-500">existimos</span>
              </h2>
              <div className="text-secondary-600 space-y-4">
                <p className="text-lg">
                  A Trip Evolved nasceu através da inquietude de seus membros quanto à falta de personalização do mercado de viagens.
                </p>
                <p className="text-lg">
                  Assim como milhares de viajantes ao redor do mundo, acreditamos que viagens são experiências únicas, frutos de sonhos individuais, e que merecem ser tratadas dessa maneira.
                </p>
              </div>
            </div>

            {/* Who We Are */}
            <div>
              <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-6">
                Quem <span className="text-primary-500">somos</span>
              </h2>
              <div className="text-secondary-600">
                <p className="text-lg">
                  A Trip Evolved é uma agência de viagens online, completa. Através de nossos fornecedores escolhidos a dedo, construímos as melhores experiências de viagem para todos os triplovers. E você só precisa se preocupar em curtir sua viagem: de todo o resto, nós cuidamos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-baloo font-bold text-secondary-900 mb-12 text-center">
            Nossos <span className="text-primary-500">idealizadores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Henrique */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/sobre/gasp.png"
                  alt="Henrique Gasparotto"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-baloo font-bold text-white mb-2">
                    Henrique Gasparotto
                  </h3>
                  <p className="text-white/90 font-comfortaa mb-4">
                    Fundador, sócio e especialista em estratégias de recomendação e produto.
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      href="https://www.instagram.com/hmgasparotto/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </Link>
                    <Link 
                      href="https://www.linkedin.com/in/hmgasparotto/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Deborah */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src="/assets/sobre/deborah.png"
                  alt="Deborah Eppi"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-baloo font-bold text-white mb-2">
                    Deborah Eppi
                  </h3>
                  <p className="text-white/90 font-comfortaa mb-4">
                    Sócia e especialista na curadoria e atendimento ao cliente.
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      href="https://www.instagram.com/deboraheppi/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </Link>
                    <Link 
                      href="https://www.linkedin.com/in/deboraheppi/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 