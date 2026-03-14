import { Metadata } from "next";
import { CruisesApiService } from "@/clients/cruises";
import CruiseDetailPage from "@/components/cruises/CruiseDetailPage";

type Props = {
  params: Promise<{ uniqueName: string }>;
};

async function getCruise(uniqueName: string) {
  try {
    return await CruisesApiService.getCruiseByUniqueName(uniqueName);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const cruise = await getCruise((await params).uniqueName);

    if (!cruise) {
      return {
        title: "Cruzeiro não encontrado",
        description: "O cruzeiro que você está procurando não existe.",
      };
    }

    const dateRange =
      cruise.departureDate && cruise.arrivalDate
        ? `${new Date(cruise.departureDate).toLocaleDateString("pt-BR")} - ${new Date(cruise.arrivalDate).toLocaleDateString("pt-BR")}`
        : "";

    return {
      title: `${cruise.title}${dateRange ? ` | ${dateRange}` : ""}`,
      description:
        cruise.description ||
        `Descubra ${cruise.title}, um cruzeiro extraordinário da ${cruise.company}.`,
      openGraph: {
        title: cruise.title,
        description:
          cruise.description ||
          `Descubra ${cruise.title}, um cruzeiro extraordinário da ${cruise.company}.`,
        images: cruise.images?.[0]?.url ? [cruise.images[0].url] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: cruise.title,
        description:
          cruise.description ||
          `Descubra ${cruise.title}, um cruzeiro extraordinário da ${cruise.company}.`,
        images: cruise.images?.[0]?.url ? [cruise.images[0].url] : undefined,
      },
    };
  } catch {
    return {
      title: "Cruzeiro não encontrado",
      description: "O cruzeiro que você está procurando não existe.",
    };
  }
}

export default async function CruisePage({ params }: Props) {
  const { uniqueName } = await params;

  return <CruiseDetailPage uniqueName={uniqueName} />;
}
