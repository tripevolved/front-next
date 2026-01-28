import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultoria de Cruzeiros de Luxo - Jornada Evolved",
  description: "Encontre seu cruzeiro ideal com nossa consultoria especializada. Curadoria dos melhores cruzeiros de luxo, sem filas, com design completo da viagem. Receba 3 opções personalizadas em 24 horas com transparência total.",
  alternates: {
    canonical: "https://tripevolved.com.br/consultoria/cruzeiros",
  },
  openGraph: {
    title: "Consultoria de Cruzeiros de Luxo - Jornada Evolved",
    description: "Encontre seu cruzeiro ideal com nossa consultoria especializada. Curadoria dos melhores cruzeiros de luxo, sem filas, com design completo da viagem.",
    url: "https://tripevolved.com.br/consultoria/cruzeiros",
    siteName: "Trip Evolved",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultoria de Cruzeiros de Luxo - Jornada Evolved",
    description: "Encontre seu cruzeiro ideal com nossa consultoria especializada. Curadoria dos melhores cruzeiros de luxo.",
  },
};

export default function CruisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
