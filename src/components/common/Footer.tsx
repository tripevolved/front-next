"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary-500 text-white pt-16 pb-8 z-100">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/brand/logo-horizontal.svg"
                alt="Trip Evolved"
                width={144}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/80 text-xs">
              Tecnologia e curadoria especializada unidas para proporcionar experiências de viagem
              exclusivas
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-baloo text-base font-semibold mb-4 text-accent-500">
              Fale conosco
            </h3>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=5551993582462&text=Ol%C3%A1%2C%20eu%20gostaria%20de%20planejar%20minha%20pr%C3%B3xima%20viagem!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors flex items-center text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  (51) 99358-2462
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tripevolved.com.br"
                  className="text-white/80 hover:text-white transition-colors flex items-center text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  info@tripevolved.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-baloo text-base font-semibold mb-4 text-accent-500">Legal</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/termos-de-uso"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Políticas de privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <a
                  href="https://forms.gle/CJ9AHosZenjgsxPN9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Canal de denúncias
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Services */}
          <div>
            <h3 className="font-baloo text-base font-semibold mb-4 text-accent-500">Serviços</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/servicos/jornada-evolved"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Jornada Evolved
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/plano-evolved"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Plano Evolved
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/evolved-experiencias"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Evolved Experiências
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Media */}
          <div>
            <h3 className="font-baloo text-base font-semibold mb-4 text-accent-500">
              Siga nas redes
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/tripevolved"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/tripevolved"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-white/80 mr-2 text-sm">Registrados no</span>
            <Image
              src="/assets/cadastur.png"
              alt="Cadastur"
              width={120}
              height={40}
              className="h-6 w-auto"
            />
          </div>
          <div className="text-white/60 text-xs">
            Copyright © 2025 Trip Evolved. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
