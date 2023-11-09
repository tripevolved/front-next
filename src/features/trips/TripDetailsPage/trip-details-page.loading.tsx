import { StepsLoader } from "@/ui";
import { MAX_REFRESH_COUNT, REFRESH_INTERVAL } from "./trip-details-page.constants";

const STEPS = [
  {
    text: "Montando a sua viagem...",
    iconName: "settings",
  },
  {
    text: "Personalizando as opções de roteiro",
    iconName: "map",
  },
  {
    text: "Encontrando meios de trasporte",
    iconName: "search",
  },
  {
    text: "Achamos algumas atrações que você vai curtir!",
    iconName: "star",
  },
  {
    text: "Adicionando dicas do destino",
    iconName: "plus-circle",
  },
  {
    text: "Verificando opções de hospedagem",
    iconName: "book-open",
  },
];

export const TripDetailsPageLoading = () => (
  <StepsLoader steps={STEPS} milliseconds={REFRESH_INTERVAL * MAX_REFRESH_COUNT} />
);
