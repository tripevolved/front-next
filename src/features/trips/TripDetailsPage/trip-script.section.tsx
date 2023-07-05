import { Box, Text, Picture } from "@/ui";
import { Link } from "mars-ds";
import { useRouter } from "next/router";

interface TripScriptSectionProps {
  text: string;
}

export const TripScriptSection = ({ text }: TripScriptSectionProps) => {
  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  return (
    <div className="trip-content-item trip-script-section">
      <Box>
        <Picture src={"/assets/destino/roteiro.svg"} />
      </Box>
      <Box className="trip-content-item__desc">
        <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
          Roteiro
        </Text>
        <Text className="trip-script-section__text">
          {text}
        </Text>
        <Link className="trip-script-section__see-script" style={{ marginTop: 0 }} href={"/app/viagens/roteiro/previa/" + idParam}>
          Ver prévia do roteiro
        </Link>
      </Box>
    </div>
  );
};
