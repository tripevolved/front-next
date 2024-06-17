import { Box, IconCustom, SectionBase, Text } from "@/ui";
import type { DestinationProps } from "./destination-page.types";
import { Button, Container, Grid } from "mars-ds";

interface DestinationProfileSectionProps extends Pick<DestinationProps, "title" | "travelerProfiles"> {
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

export const DestinationProfileSection = ({
  title,
  travelerProfiles = [],
  children,
}: DestinationProfileSectionProps) => {
  return (<>
      {travelerProfiles.length ? (
        <Container className="pt-xl">
          <Text as="h2" heading className="mb-sm" size="xs">
            Este destino combina com...
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
