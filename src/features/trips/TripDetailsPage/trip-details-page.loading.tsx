import { StepsLoader } from "@/ui";
import { REFRESH_INTERVAL } from "./trip-details-page.constants";
import { useState } from "react";

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

export const TripDetailsPageLoading = () => {
  const [retry, setRetry] = useState(0);
  return (
    <StepsLoader
      key={retry}
      steps={STEPS}
      milliseconds={REFRESH_INTERVAL * 2}
      onFinish={() => setRetry((state) => state + 1)}
    />
  );
};
