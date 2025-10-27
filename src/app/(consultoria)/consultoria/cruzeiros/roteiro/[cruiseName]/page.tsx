import { use } from "react";
import { getExperienceByName } from "@/core/types/experiences";
import { Metadata } from "next";
import CruiseExperienceNotFound from "@/components/cruises/CruiseExperienceNotFound";
import CruiseScriptBooking from "@/components/cruises/CruiseScriptBooking";

type Props = {
  params: Promise<{ cruiseName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const experience = getExperienceByName((await params).cruiseName);

  if (!experience) {
    return {
      title: "Experiência não encontrada",
      description: "A experiência que você está procurando não existe.",
    };
  }

  return {
    title: `${experience.title}`,
    description: experience.description,
    openGraph: {
      title: `${experience.title}`,
      description: experience.description,
      images: experience.images?.[0] ? [experience.images[0]] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${experience.title}`,
      description: experience.description,
      images: experience.images?.[0] ? [experience.images[0]] : undefined,
    },
  };
}

export default function CruiseScript({ params }: Props) {
  const { cruiseName } = use(params);
  const experience = getExperienceByName(cruiseName);

  if (!experience) {
    return <CruiseExperienceNotFound />;
  }

  return <CruiseScriptBooking experience={experience} />;
}
