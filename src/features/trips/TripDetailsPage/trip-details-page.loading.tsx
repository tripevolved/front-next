import { StepsLoader } from "@/ui";
import { MAX_REFRESH_COUNT, REFRESH_INTERVAL } from "./trip-details-page.constants";

const STEPS = [
  {
    text: "Montando a sua viagem...",
    iconName: "settings",
  },
  {
    text: "Encontrando as opções de transporte até o destino",
    iconName: "search",
  },
  {
    text: "Construindo seu itinerário detalhado",
    iconName: "map",
  },
  {
    text: "Encontrando o melhor transporte até o destino...",
    iconName: "search",
  },
  {
    text: "Adicionando dicas do destino",
    iconName: "plus-circle",
  },
  {
    text: "Verificando opções de hospedagem",
    iconName: "book-open",
  },
  {
    text: "Achamos algumas atrações que você vai curtir!",
    iconName: "star",
  },
];

export const TripDetailsPageLoading = () => (
  <StepsLoader steps={STEPS} milliseconds={REFRESH_INTERVAL * MAX_REFRESH_COUNT} />
);
