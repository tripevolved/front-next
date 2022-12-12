import { Section, SectionProps } from "@/ui/section";
import { Picture } from "@/ui/picture";ß
import { Box } from "@chakra-ui/react";

export interface SectionLogoWithImageProps extends SectionProps {}

export const SectionLogoWithImage = ({ ...props }) => {
  return (
    <Section {...props}>
      <Box width="full" pt={5} alignContent="center" textAlign="center">
        <Picture src="/assets/intro/decoration.png" height={50} width={50} />
      </Box>
      <Box width="full" alignContent="center" textAlign="center">
        <Picture
          src="/assets/intro/hero.png"
          height={241}
          width={350}
          zIndex={-100000}
          mb={{ base: "-9px", md: "-24px", lg: "-89px" }}
        />
      </Box>
    </Section>
  );
};
