import { Card } from "mars-ds";
import { Text, Picture } from "@/ui";
import { CardsSuggestionProps } from "./cards-suggestion.types";
import { useState } from "react";

export const CardSuggestion = ({ icon, text, onClick }: CardsSuggestionProps) => {
  return (
    <Card className="card-suggestion" style={{ border: "1px dashed var(--color-brand-2)" }}>
      <Picture src={`/assets/script/${icon}-suggestion.svg`} />
      <Text className="card-suggestion__text">{text}</Text>
      <Text className="card-suggestion__discard" onClick={onClick}>
        Descartar
      </Text>
    </Card>
  );
};

export const AttractionsSuggestion = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <CardSuggestion
          text="Ver indicações de bares e festas"
          icon="attraction"
          onClick={() => setVisible(false)}
        />
      )}
    </>
  );
};

export const GastronomySuggestion = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <CardSuggestion
          text="Ver indicações de restaurantes"
          icon="gastronomy"
          onClick={() => setVisible(false)}
        />
      )}
    </>
  );
};
