'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useWizard } from '@/contexts/WizardContext'
import Button from '@/components/common/Button'

export default function TopMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openWizard } = useWizard();

  const navLinks = [
    { href: "/destinos", label: "Destinos" },
    { href: "/beneficios", label: "Por que a Trip Evolved?" },
    { href: "/app/entrar", label: "Minhas viagens" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-primary-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/brand/logo-horizontal.svg"
              alt="Trip Evolved"
              width={144}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-secondary-500 hover:text-primary-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-12 mr-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-baloo text-secondary-500 hover:text-primary-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              onClick={openWizard}
              event="pre_descobrir_viagem"
              eventOptions={{
                source: 'Top Menu'
              }}
              className="font-baloo bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-colors"
            >
              Descobrir minha viagem
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-primary-100 md:hidden">
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block font-baloo text-secondary-500 hover:text-primary-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  onClick={() => {
                    openWizard();
                    setIsMenuOpen(false);
                  }}
                  event="pre_descobrir_viagem"
                  eventOptions={{
                    source: 'Top Menu'
                  }}
                  className="w-full font-baloo bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-colors"
                >
                  Descobrir minha viagem
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}