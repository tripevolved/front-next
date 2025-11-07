"use client";

import { Experience } from "@/core/types/experiences";
import Button from "../common/Button";
import Image from "next/image";
import Link from "next/link";
import { DetailsCard } from "./DetailsCard";
import ReviewsCarousel from "../ReviewsCarousel";
import { useState } from "react";
import { PhotoCarousel } from "../PhotoCarousel";
import { Photo } from "@/core/types";
import { MuxVideoPlayer } from "../MuxVideoPlayer";

interface CruiseScriptProps {
  experience: Experience;
}
export default function CruiseScriptBooking({ experience }: CruiseScriptProps) {
  const [isCruiseDetailsModalOpen, setIsCruiseDetailsModalOpen] = useState<boolean>(false);

  const handleExitModal = () => {
    setIsCruiseDetailsModalOpen(false);
  };

  const photos: Photo[] = [
    {
      title: "aaaa",
      sources: [
        {
          height: 100,
          width: 100,
          url: "https://cdn.expertphotography.com/wp-content/uploads/2020/10/Fine-Art-Photography-Examples-Sunlight-Planets-by-Troyes-Christina.jpg",
          type: "lg",
        },
      ],
      alt: "Foto casal jantar",
    },
    {
      title: "aaaa",
      sources: [
        {
          height: 100,
          width: 100,
          url: "https://cdn.expertphotography.com/wp-content/uploads/2020/10/Fine-Art-Photography-Examples-Sunlight-Planets-by-Troyes-Christina.jpg",
          type: "lg",
        },
      ],
      alt: "Foto casal jantar",
    },
  ];

  console.log(experience);

  return (
    <>
      <div>
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 w-full h-full">
              <MuxVideoPlayer
                playbackId="36MPnXNByTEUZpeN00DMChaLhhXUYPgLkniNy6k2kCmw"
                isMuted={true}
                autoplay={true}
                loop={true}
                placeholderImage="/assets/consultoria/caribe/vsl_poster.jpg"
                className="h-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full px-4 md:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">{`Sua jornada a dois por ${experience.title}`}</p>
                <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6 text-white">
                  {experience.title}
                </h1>
              </div>
              <div className="w-full text-center">
                <Button className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all">
                  Quero saber mais
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3">
          <section className=" p-2 flex-col gap-4 container">
            <div className="flex flex-col gap-4 px-2 md:px-10 py-3">
              <h1 className="font-baloo text-3xl font-bold md:text-4xl">
                Por que <span className="text-primary-500">{experience.title}</span>?
              </h1>
              <div className="flex md:flex-row flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="relative md:h-[400px] h-[400px]">
                    <Image
                      src="/assets/experiences/miami/freedom-of-seas.png"
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                    />
                  </div>
                  <span>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dicta voluptatem
                    voluptates deserunt exercitationem minus laborum animi rem ullam dolores modi
                    repellendus vel, incidunt aut! Atque cum ipsam dignissimos voluptate.
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="relative md:h-[400px] h-[400px]">
                    <Image
                      src="/assets/experiences/miami/freedom-of-seas.png"
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                    />
                  </div>
                  <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dicta voluptatem
                    voluptates deserunt exercitationem minus laborum animi rem ullam dolores modi
                    repellendus vel, incidunt aut! Atque cum ipsam dignissimos voluptate.
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center p-3 flex-col gap-4">
            <h1 className="font-baloo text-3xl font-bold md:text-4xl">O seu roteiro pronto</h1>
            <div className="container w-full gap-10 p-0">
              <div className="bg-white shadow-lg rounded-lg w-full h-full max-h-[100vh] flex flex-col gap-5 p-5 cursor-pointer hover:bg-gray-300/30 transition-colors">
                <div className="h-96">
                  <PhotoCarousel photos={photos} title="aaaa" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold font-baloo">
                    Seu roteiro por{" "}
                    <span className="font-bold text-primary-500">{experience.title}</span>
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-lg">Inclui:</span>
                  <div>
                    <ul className="list-disc pl-5 flex flex-col gap-3 text-md font-comfortaa">
                      <li className="flex gap-3 items-center">
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="17.5" cy="17.5" r="17.5" fill="#0AB9AD" />
                          <path
                            d="M19.8843 14.7019L23.9042 13.6393C24.1154 13.5835 24.3357 13.5693 24.5525 13.5975C24.7692 13.6257 24.9783 13.6957 25.1676 13.8035C25.357 13.9114 25.5229 14.055 25.656 14.2261C25.7891 14.3972 25.8867 14.5925 25.9433 14.8009C25.9999 15.0092 26.0143 15.2265 25.9857 15.4403C25.9572 15.6542 25.8862 15.8604 25.7769 16.0471C25.6675 16.2339 25.522 16.3976 25.3485 16.5289C25.175 16.6602 24.977 16.7565 24.7658 16.8123L12.7044 20L9 15.8786L11.4116 15.2406L13.4511 16.4025L15.8636 15.7645L12.7469 10.6372L15.1593 10L19.8835 14.7019H19.8843Z"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 24H25"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>
                          <span className="font-bold text-primary-500">Voo</span> em classe
                          econômica
                        </span>
                      </li>
                      <li className="flex gap-3 items-center">
                        {" "}
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="17.5" cy="17.5" r="17.5" fill="#0AB9AD" />
                          <path
                            d="M19.8843 14.7019L23.9042 13.6393C24.1154 13.5835 24.3357 13.5693 24.5525 13.5975C24.7692 13.6257 24.9783 13.6957 25.1676 13.8035C25.357 13.9114 25.5229 14.055 25.656 14.2261C25.7891 14.3972 25.8867 14.5925 25.9433 14.8009C25.9999 15.0092 26.0143 15.2265 25.9857 15.4403C25.9572 15.6542 25.8862 15.8604 25.7769 16.0471C25.6675 16.2339 25.522 16.3976 25.3485 16.5289C25.175 16.6602 24.977 16.7565 24.7658 16.8123L12.7044 20L9 15.8786L11.4116 15.2406L13.4511 16.4025L15.8636 15.7645L12.7469 10.6372L15.1593 10L19.8835 14.7019H19.8843Z"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 24H25"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>
                          <span className="font-bold text-primary-500">Hotel</span> 4 estrelas em
                          boa localização
                        </span>
                      </li>
                      <li className="flex gap-3 items-center">
                        {" "}
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="17.5" cy="17.5" r="17.5" fill="#0AB9AD" />
                          <path
                            d="M19.8843 14.7019L23.9042 13.6393C24.1154 13.5835 24.3357 13.5693 24.5525 13.5975C24.7692 13.6257 24.9783 13.6957 25.1676 13.8035C25.357 13.9114 25.5229 14.055 25.656 14.2261C25.7891 14.3972 25.8867 14.5925 25.9433 14.8009C25.9999 15.0092 26.0143 15.2265 25.9857 15.4403C25.9572 15.6542 25.8862 15.8604 25.7769 16.0471C25.6675 16.2339 25.522 16.3976 25.3485 16.5289C25.175 16.6602 24.977 16.7565 24.7658 16.8123L12.7044 20L9 15.8786L11.4116 15.2406L13.4511 16.4025L15.8636 15.7645L12.7469 10.6372L15.1593 10L19.8835 14.7019H19.8843Z"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 24H25"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>
                          <span className="font-bold text-primary-500">Passeio</span> X
                        </span>
                      </li>
                      <li className="flex gap-3 items-center">
                        {" "}
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="17.5" cy="17.5" r="17.5" fill="#0AB9AD" />
                          <path
                            d="M19.8843 14.7019L23.9042 13.6393C24.1154 13.5835 24.3357 13.5693 24.5525 13.5975C24.7692 13.6257 24.9783 13.6957 25.1676 13.8035C25.357 13.9114 25.5229 14.055 25.656 14.2261C25.7891 14.3972 25.8867 14.5925 25.9433 14.8009C25.9999 15.0092 26.0143 15.2265 25.9857 15.4403C25.9572 15.6542 25.8862 15.8604 25.7769 16.0471C25.6675 16.2339 25.522 16.3976 25.3485 16.5289C25.175 16.6602 24.977 16.7565 24.7658 16.8123L12.7044 20L9 15.8786L11.4116 15.2406L13.4511 16.4025L15.8636 15.7645L12.7469 10.6372L15.1593 10L19.8835 14.7019H19.8843Z"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 24H25"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>
                          <span className="text-primary-500 font-bold">Suporte</span> básico
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="font-bold flex flex-col gap-1 font-baloo text-2xl">
                  <h1>A partir de</h1>
                  <span className="text-primary-500">R$0,00</span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <button
                    className="inline-flex text-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64"
                    type="button"
                  >
                    <span>Reservar no Whats</span>
                  </button>
                  <button
                    className="flex justify-center gap-3  text-black px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64"
                    type="button"
                  >
                    <span>Ver detalhes</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center p-3 flex-col gap-4">
            <h1 className="font-baloo text-3xl font-bold md:text-4xl">
              A sua <span className="text-primary-500">Jornada Evolved</span>
            </h1>
            <div className="container w-full gap-10 p-0">
              <div className="bg-white shadow-lg rounded-lg w-full h-full max-h-[100vh] flex flex-col gap-5 p-5 cursor-pointer hover:bg-gray-300/30 transition-colors">
                <div className="h-[150rem]">
                  <PhotoCarousel title="Cruzeiros" photos={photos} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-xl">
                    Com <span className="italic text-primary-500">tudo</span> cuidado para você
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-2xl font-baloo text-primary-500">Inclui:</span>
                    <ul className="list-disc pl-5 flex flex-col gap-3 text-md font-comfortaa">
                      <li>
                        <span className="font-bold text-primary-500">Itinerário personalizado</span>
                      </li>
                      <li>Escolha dos melhores voos, hospedagens e passeios</li>
                      <li>Indicação de restaurantes</li>
                      <li>
                        Logística detalhada da viagem, com reserva de transfers, trens, aluguéis de
                        carros
                      </li>
                      <li>
                        <span className="font-bold text-primary-500">Assistência</span> 24/7
                      </li>
                      <li>Mimos exclusivos</li>
                    </ul>
                  </div>
                </div>
                <div className="font-bold flex flex-col gap-1 font-baloo text-2xl italic">
                  <span>
                    Taxa de <span className="text-primary-500">consultoria</span> + Viagem conforme
                    seu orçamento
                  </span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <button
                    className="inline-flex text-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64"
                    type="button"
                  >
                    <span>Contratar pelo Whats</span>
                  </button>
                  <button
                    className="flex justify-center gap-3  text-black px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64"
                    type="button"
                  >
                    <span>Ver detalhes</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Conversa com Especialistas */}
          <section className="flex items-center p-2 flex-col gap-4 container">
            <div className="flex flex-col gap-2 px-10 py-5 ">
              <h1 className="font-baloo text-3xl font-bold md:text-4xl">
                Por que a <span className="text-primary-500">Trip Evolved</span>?
              </h1>
              <span className="text-lg">
                Criado por Henrique Gasparotto e Deborah Eppi, a Trip Evolved nasceu porque
                acreditamos que viagens são experiências únicas e merecem ser vividas como tal.
              </span>
            </div>
            <div className="flex md:grid flex-col md:grid-cols-2 gap-10 w-full md:w-10/12 ">
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
                          <title>Logo do Instagram</title>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/hmgasparotto/"
                        target="_blank"
                        className="text-white hover:text-accent-500"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <title>Logo do Linkedin</title>
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
                          <title>Logo do Instagram</title>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/deboraheppi/"
                        target="_blank"
                        className="text-white hover:text-accent-500"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <title>Logo do Linkedin</title>
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
          <section className="flex flex-col gap-5 bg-secondary-200 p-10 ">
            <div className="flex flex-col gap-9 justify-center items-center px-6">
              <div className="flex md:grid md:grid-cols-2 md:grid-rows-2 flex-col items-center gap-10 md:max-w-5xl">
                <DetailsCard
                  message={
                    <p>
                      Curadoria dos melhores{" "}
                      <span className="font-bold text-accent-500">cruzeiros</span> do mundo
                    </p>
                  }
                />
                <DetailsCard message=" Conveniência para você: nós cuidamos de todos os detalhes" />
                <DetailsCard message=" Personalizamos toda a sua viagem, não só o cruzeiro" />
                <DetailsCard
                  message={
                    <p>
                      Assistência de{" "}
                      <span className="font-bold text-accent-500">especialistas</span>
                    </p>
                  }
                />
              </div>
            </div>
          </section>

          {/* O que dizem nossos clientes? */}
          <section className="flex flex-col md:px-8 md:py-8 px-2 py-8 container">
            <div className="flex md:justify-center pl-3">
              <h1 className="font-baloo text-3xl font-bold md:text-4xl">
                O que dizem nossos clientes?
              </h1>
            </div>
            <div className="p-3 flex items-center justify-center w-full">
              <div className="md:max-w-4xl w-full">
                <ReviewsCarousel />
              </div>
            </div>
          </section>

          {/* Oportunidades Exclusivas */}
          <section className="flex flex-col justify-center gap-3 from-primary-600 to-primary-700 bg-gradient-to-br p-10 ">
            <div className="flex pl-3">
              <h1 className="font-baloo text-3xl font-bold md:text-4xl text-white">
                Quer entender como podemos te ajudar?
              </h1>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg px-8 text-white">
                Entendemos que cada viagem é única, porque você é único. Nos chame no Whats;
                adoraríamos entender você e seus desejos para transformar em uma viagem
                inesquecível.
              </p>
              <button
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-baloo font-semibold text-xl transition-colors min-w-64"
                type="button"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <title>Logo do Whatsapp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>Entrar no grupo</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
