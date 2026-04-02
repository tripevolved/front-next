import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cruzeiros de Luxo: a Jornada Evolved",
  description: "Uma seleção de jornadas pelo mar, curadas para casais que querem explorar com profundidade — sem perder tempo com decisões erradas",
  alternates: {
    canonical: "https://tripevolved.com.br/consultoria/cruzeiros",
  },
  openGraph: {
    title: "Cruzeiros de Luxo: a Jornada Evolved",
    description: "Uma seleção de jornadas pelo mar, curadas para casais que querem explorar com profundidade — sem perder tempo com decisões erradas",
    url: "https://tripevolved.com.br/consultoria/cruzeiros",
    siteName: "Trip Evolved",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cruzeiros de Luxo: a Jornada Evolved",
    description: "Uma seleção de jornadas pelo mar, curadas para casais que querem explorar com profundidade — sem perder tempo com decisões erradas",
  },
};

export default function CruisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
