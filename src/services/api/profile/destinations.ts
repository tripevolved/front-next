import { Photo } from "@/core/types";
import { API_URL, ApiRequest } from "@/services/api/request";
import axios from "axios";

interface Destination {
  id: string;
  name: string;
  coverImageUrl: string | null;
  href: string;
}

interface DestinationsResponse {
  destinations: DestinationItem[];
}

export interface DestinationItem {
  coverImage: Photo;
  title: string;
  destinationId: string;
  name: string;
  uniqueName: string;
}

export interface PublicDestinationResponse {
  page: number;
  totalPages: number;
  perPage: number;
  destinations: Omit<DestinationItem, "title">[];
}

export interface PublicDestinationsRequestParams {
  search?: string;
  uniqueName?: string;
  page?: number;
}

const serializer = ({ destinations }: DestinationsResponse): Destination[] =>
  destinations.map(({ destinationId, name, coverImage, uniqueName }) => ({
    id: destinationId,
    name,
    coverImageUrl: coverImage.sources.find(({ type }) => type === "md")?.url || null,
    href: `/destinos/${uniqueName}`,
  }));

export const getDestinations = async (profileName: string) => {
  const route = `profiles/${profileName}`;
  return ApiRequest.get<DestinationsResponse>(route).then(serializer);
};

export const getPublicDestinations = async ({
  search = "",
  uniqueName = "",
  page = 1,
}: PublicDestinationsRequestParams) => {
  console.log("tá batendo aqui");
  const params = new URLSearchParams({ search, profile: uniqueName, page: String(page) });
  const route = `${API_URL}/api/destinations/paginated?${params.toString()}`;
  return ApiRequest.get<PublicDestinationResponse>(route);

  const mock: PublicDestinationResponse = {
    page: 1,
    totalPages: 11,
    perPage: 6,
    destinations: [
      {
        destinationId: "59725103-e4af-4bdf-92a1-b0f7a3ec6856",
        name: "Fernando de Noronha",
        uniqueName: "fernando-de-noronha",
        coverImage: {
          title: "fernando-de-noronha",
          sources: [
            {
              url: "https://images.prismic.io/tripevolved/18867367-1e73-4492-b27c-82d9a57ebdcd_Fernando+de+Noronha.jpeg?auto=compress,format&rect=990,0,3958,3958&w=600&h=600",
              type: "md",
              width: 600.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/18867367-1e73-4492-b27c-82d9a57ebdcd_Fernando+de+Noronha.jpeg?auto=compress,format&rect=330,0,5277,3958&w=800&h=600",
              type: "lg",
              width: 800.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/18867367-1e73-4492-b27c-82d9a57ebdcd_Fernando+de+Noronha.jpeg?auto=compress,format&rect=0,284,5937,3393&w=1400&h=800",
              type: "xl",
              width: 1400.0,
              height: 800.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/18867367-1e73-4492-b27c-82d9a57ebdcd_Fernando+de+Noronha.jpeg?auto=compress,format&rect=0,309,5937,3340&w=1920&h=1080",
              type: "xxl",
              width: 1920.0,
              height: 1080.0,
            },
          ],
        },
      },
      {
        destinationId: "53466d7d-68b6-4e7c-9b76-feda7875e2b9",
        name: "Rio de Janeiro",
        uniqueName: "rio-de-janeiro",
        coverImage: {
          title: "rio-de-janeiro",
          sources: [
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=790,0,3181,3181&w=600&h=600",
              type: "md",
              width: 600.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=260,0,4241,3181&w=800&h=600",
              type: "lg",
              width: 800.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=0,228,4766,2723&w=1400&h=800",
              type: "xl",
              width: 1400.0,
              height: 800.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=0,251,4766,2681&w=1920&h=1080",
              type: "xxl",
              width: 1920.0,
              height: 1080.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=790,0,3181,3181&w=600&h=600",
              type: "md",
              width: 600.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=260,0,4241,3181&w=800&h=600",
              type: "lg",
              width: 800.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=0,228,4766,2723&w=1400&h=800",
              type: "xl",
              width: 1400.0,
              height: 800.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c063871e-9d64-4c6b-8b22-4e2377a7e6c4_rio-de-janeiro.jpeg?auto=compress,format&rect=0,251,4766,2681&w=1920&h=1080",
              type: "xxl",
              width: 1920.0,
              height: 1080.0,
            },
          ],
        },
      },
      {
        destinationId: "d60bc475-f7a9-4e5a-8656-2f69bd09f1e6",
        name: "Belo Horizonte",
        uniqueName: "belo-horizonte",
        coverImage: {
          title: "belo-horizonte",
          sources: [
            {
              url: "https://images.prismic.io/tripevolved/b27951e0-450d-49a9-ad44-4aa105a5a29a_Belo+Horizonte+1.png?auto=compress,format&rect=419,0,1080,1080&w=600&h=600",
              type: "md",
              width: 600.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/b27951e0-450d-49a9-ad44-4aa105a5a29a_Belo+Horizonte+1.png?auto=compress,format&rect=239,0,1440,1080&w=800&h=600",
              type: "lg",
              width: 800.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/b27951e0-450d-49a9-ad44-4aa105a5a29a_Belo+Horizonte+1.png?auto=compress,format&rect=15,0,1890,1080&w=1400&h=800",
              type: "xl",
              width: 1400.0,
              height: 800.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/b27951e0-450d-49a9-ad44-4aa105a5a29a_Belo+Horizonte+1.png?auto=compress,format&rect=0,0,1920,1080&w=1920&h=1080",
              type: "xxl",
              width: 1920.0,
              height: 1080.0,
            },
          ],
        },
      },
      {
        destinationId: "0ad34ec1-1e1d-4a53-ac60-a8a631c4d9b3",
        name: "Ouro Preto",
        uniqueName: "ouro-preto",
        coverImage: {
          title: "ouro-preto",
          sources: [
            {
              url: "https://images.prismic.io/tripevolved/296cce51-e4f1-4ee1-89ca-dba6072ffb47_Ouro+Preto+1.png?auto=compress,format&rect=419,0,1080,1080&w=600&h=600",
              type: "md",
              width: 600.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/296cce51-e4f1-4ee1-89ca-dba6072ffb47_Ouro+Preto+1.png?auto=compress,format&rect=239,0,1440,1080&w=800&h=600",
              type: "lg",
              width: 800.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/296cce51-e4f1-4ee1-89ca-dba6072ffb47_Ouro+Preto+1.png?auto=compress,format&rect=15,0,1890,1080&w=1400&h=800",
              type: "xl",
              width: 1400.0,
              height: 800.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/296cce51-e4f1-4ee1-89ca-dba6072ffb47_Ouro+Preto+1.png?auto=compress,format&rect=0,0,1920,1080&w=1920&h=1080",
              type: "xxl",
              width: 1920.0,
              height: 1080.0,
            },
          ],
        },
      },
      {
        destinationId: "2a1f3d68-f687-4475-8743-36427a5e7681",
        name: "Tiradentes",
        uniqueName: "tiradentes",
        coverImage: {
          title: "tiradentes",
          sources: [
            {
              url: "https://images.prismic.io/tripevolved/c09840ef-243f-463e-aa76-90ea80276515_Tiradentes+1.jpeg?auto=compress,format&rect=832,0,2627,2627&w=600&h=600",
              type: "md",
              width: 600.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c09840ef-243f-463e-aa76-90ea80276515_Tiradentes+1.jpeg?auto=compress,format&rect=394,0,3503,2627&w=800&h=600",
              type: "lg",
              width: 800.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c09840ef-243f-463e-aa76-90ea80276515_Tiradentes+1.jpeg?auto=compress,format&rect=0,89,4287,2450&w=1400&h=800",
              type: "xl",
              width: 1400.0,
              height: 800.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/c09840ef-243f-463e-aa76-90ea80276515_Tiradentes+1.jpeg?auto=compress,format&rect=0,107,4287,2411&w=1920&h=1080",
              type: "xxl",
              width: 1920.0,
              height: 1080.0,
            },
          ],
        },
      },
      {
        destinationId: "7b0d0d15-e04e-49d3-a479-2c6e6fb8f267",
        name: "Porto Alegre",
        uniqueName: "porto-alegre",
        coverImage: {
          title: "porto-alegre",
          sources: [
            {
              url: "https://images.prismic.io/tripevolved/8bf55187-ff3b-4b83-9da4-4dcf8938e2d2_Salvador+1.png?auto=compress,format&rect=419,0,1080,1080&w=600&h=600",
              type: "md",
              width: 600.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/8bf55187-ff3b-4b83-9da4-4dcf8938e2d2_Salvador+1.png?auto=compress,format&rect=239,0,1440,1080&w=800&h=600",
              type: "lg",
              width: 800.0,
              height: 600.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/8bf55187-ff3b-4b83-9da4-4dcf8938e2d2_Salvador+1.png?auto=compress,format&rect=15,0,1890,1080&w=1400&h=800",
              type: "xl",
              width: 1400.0,
              height: 800.0,
            },
            {
              url: "https://images.prismic.io/tripevolved/8bf55187-ff3b-4b83-9da4-4dcf8938e2d2_Salvador+1.png?auto=compress,format&rect=0,0,1920,1080&w=1920&h=1080",
              type: "xxl",
              width: 1920.0,
              height: 1080.0,
            },
          ],
        },
      },
    ],
  };

  //return mock;
};
