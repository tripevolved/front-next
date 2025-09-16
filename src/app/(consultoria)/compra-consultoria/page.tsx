"use client";
import Button from "@/components/common/Button";
import { CruiseCard } from "@/components/cruises/CruiseCard";
import Image from "next/image";
import Link from "next/link";

export default function CompraConsultoria() {
  type DetailsCardProps = {
    message: string;
  };

  const DetailsCard = ({ message }: DetailsCardProps) => {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow w-96 h-52 flex flex-col items-center">
        <div className="text-primary-300 mb-4">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
        <p className="text-secondary-600 text-lg font-comfortaa text-center">{message}</p>
      </div>
    );
  };
  return (
    <div>
      {/* Background Image with Overlay */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/home/cruzeiros-extraordinarios.jpg"
            alt="Cruzeiros extraordinários com a Trip Evolved"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="w-full px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
                O seu cruzeiro começa pelo que você quer viver.
              </p>
              <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                Cruzeiros extraordinários.
              </h1>
            </div>
            <div className="w-full text-center">
              <Button className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-2xl font-semibold hover:bg-accent-600 transition-all">
                Quero saber mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {/* Content */}
        <section className="p-5 flex flex-col gap-7 bg-secondary-500 text-white ">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              Os melhores cruzeiros para casais...
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-4">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/assets/home/cruzeiros/barcelona.png"
                alt="Mediterrâneo - História e cultura milenar"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="font-comfortaa text-2xl leading-relaxed">
                Se você sonha com um cruzeiro e não sabe como escolher, está no lugar{" "}
                <span className="font-bold text-accent-500">certo</span>
              </p>
              <p className="font-comfortaa text-2xl leading-relaxed">
                Na <span className="text-primary-500 font-bold">Trip</span>{" "}
                <span className="text-accent-500 font-bold">Evolved</span>, realizamos uma curadoria
                detalhada dos maiores cruzeiros do mundo. E usamos nossa experiência de mais de 20
                anos de mercado para conectar você à experiência certa.
              </p>
            </div>
          </div>
        </section>

        <section className="p-5 flex flex-col gap-7">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              ...que querem <span className="text-primary-500">relaxar</span>
            </h1>
          </div>
          <div className="flex justify-around items-center md:flex-row flex-col w-full gap-10">
            <CruiseCard />
            <CruiseCard />
          </div>
        </section>

        <section className="p-5 flex flex-col gap-7">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              ...que querem <span className="text-primary-500">gastronomia</span> fora de série
            </h1>
          </div>
          <div className="flex justify-around items-center md:flex-row flex-col w-full gap-10">
            <CruiseCard />
            <CruiseCard />
          </div>
        </section>

        <section className="p-5 flex flex-col gap-7">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              ...que querem <span className="text-primary-500">agito</span> e{" "}
              <span className="text-accent-500">exclusividade</span>
            </h1>
          </div>
          <div className="flex justify-around items-center md:flex-row flex-col w-full gap-10">
            <CruiseCard />
            <CruiseCard />
          </div>
        </section>

        <section className="p-5 flex flex-col gap-7">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              ...que querem a <span className="text-primary-500">expedição</span> da vida
            </h1>
          </div>
          <div className="flex justify-around items-center md:flex-row flex-col w-full gap-10">
            <CruiseCard />
            <CruiseCard />
          </div>
        </section>

        <section className="p-5 flex flex-col gap-7">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              ...que buscam um cruzeiro fluvial
            </h1>
          </div>
          <div className="flex justify-around items-center md:flex-row flex-col w-full gap-10">
            <CruiseCard />
            <CruiseCard />
          </div>
        </section>

        {/* Conversa com Especialistas */}
        <section className="flex items-center p-2 flex-col gap-4">
          <div className="flex justify-center mb-4">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">Não achou o seu roteiro?</h1>
          </div>
          <button className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 md:px-10 md:py-6 rounded-full font-baloo font-semibold text-lg md:text-xl transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            Conversar com especialista no Whats
          </button>
          <div className="flex md:grid flex-col md:grid-cols-2 gap-10 w-full">
            {/* Henrique */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg w-full">
              <div className="relative md:h-[600px] h-[400px]">
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
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/hmgasparotto/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg w-full">
              <div className="relative md:h-[600px] h-[400px]">
                <Image
                  src="/assets/sobre/deborah.png"
                  alt="Henrique Gasparotto"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-baloo font-bold text-white mb-2">Deborah Eppi</h3>
                  <p className="text-white/90 font-comfortaa mb-4">
                    Fundador, sócio e especialista em estratégias de recomendação e produto.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="https://www.instagram.com/deboraheppi/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/deboraheppi/"
                      target="_blank"
                      className="text-white hover:text-accent-500"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Por que a Trip Evolved? */}
        <section className="flex flex-col gap-5 bg-primary-200 md:p-8 pb-6">
          <div className="flex flex-col gap-2 px-10 py-5">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              Por que a <span className="text-primary-500">Trip Evolved</span>?
            </h1>
            <span className="text-xl">
              Criado por Henrique Gasparotto e Deborah Eppi, a Trip Evolved nasceu porque
              acreditamos que viagens são experiências únicas e merecem ser vividas como tal.
            </span>
          </div>
          <div className="flex flex-col gap-9 justify-center items-center px-6">
            <div className="flex md:grid md:grid-cols-2 md:grid-rows-2 flex-col items-center gap-10 md:max-w-5xl">
              <DetailsCard message="Curadoria dos melhores cruzeiros do mundo" />
              <DetailsCard message=" Conveniência para você: nós cuidamos de todos os detalhes" />
              <DetailsCard message=" Personalizamos toda a sua viagem, não só o cruzeiro" />
              <DetailsCard message=" Assistência de especialistas" />
            </div>
          </div>
        </section>

        {/* O que dizem nossos clientes? */}
        <section className="flex flex-col">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl">
              O que dizem nossos clientes?
            </h1>
          </div>
          <div className="bg-red-700 h-[100px] px-10"></div>
        </section>

        {/* Oportunidades Exclusivas */}
        <section className="flex flex-col justify-center gap-3 from-primary-600 to-primary-700 bg-gradient-to-br p-8 md:p-10">
          <div className="flex pl-3">
            <h1 className="font-baloo text-3xl font-bold md:text-5xl text-white">
              Oportunidades e roteiros exclusivos
            </h1>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl px-3 text-white">
              Todo dia, compartilhamos roteiros, dicas e oportunidades exclusivas dos melhores
              cruzeiros do mundo. Entre em nosso grupo no Whatsapp.
            </p>
            <button className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>Entrar no grupo</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
