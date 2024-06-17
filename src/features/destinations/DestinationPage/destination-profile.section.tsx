import { Box, Tag, Text } from "@/ui";
import type { DestinationProps } from "./destination-page.types";
import { Button, Container } from "mars-ds";
import { TravelType } from "@/core/types";

interface DestinationProfileSectionProps extends Pick<DestinationProps, "title" | "travelerProfiles" | "travelType"> {
  children?: any;
}

const emojiProfiles = { 
  "aventureiro": "⛷️",
  "intelectual": "📚",
  "so-se-vive-uma-vez": "🧗",
  "alternativo": "🌍",
  "relax": "🏖",
  "fa-da-rotina": "🛋",
  "insaciavel": "🗼",
  "dinamico": "🤸‍♀️",
  "gastronomico": "🫕",
  "musicalidade": "🎶",
  "espiritual": "🙏",
  "garantido": "🛌"
} as { [key: string]: string };

const travelTypeMapping = {
  "PAIRS": "duplas",
  "COUPLES": "casais ❤",
  "FAMILIES": "famílias",
  "INDIVIDUAL": "viajantes solo"
} as { [type: string]: string };

export const DestinationProfileSection = ({
  title,
  travelerProfiles = [],
  travelType,
  children,
}: DestinationProfileSectionProps) => {
  return (<>
      {travelerProfiles.length ? (
        <Container className="pt-xl">
          <Tag className="mb-xl mt-sm" >
            Recomendado para <strong>{travelTypeMapping[travelType]}</strong>
          </Tag>
          <Text as="h2" heading className="mb-sm" size="xs">
            Este destino combina com perfil...
          </Text>
          <Box>
            {travelerProfiles.map((profile, index) => {
              return (
                <Button key={index} variant="secondary" size="sm" href={`/perfil/${profile}`} style={{margin: "0 0 0 8px"}}>
                  #{profile} {emojiProfiles[profile]}
                </Button>
              );
            })}
          </Box>
        </Container>) : null}
    </>);
};
