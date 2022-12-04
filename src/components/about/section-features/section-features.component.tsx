import { Heading, HeadingProps } from "@/ui/heading";
import { Section, SectionProps } from "@/ui/section";
import { Text, TextProps } from "@/ui/text";
import { Box, BoxProps, Grid } from "@chakra-ui/react";

export interface SectionFeaturesAboutProps extends SectionProps {
  heading: HeadingProps;
  features: FeatureItem[];
}

interface FeatureItem extends BoxProps {
  heading: HeadingProps;
  text: TextProps;
}

export const SectionFeaturesAbout = ({
  heading,
  features = [],
  ...props
}: SectionFeaturesAboutProps) => {
  return (
    <Section {...props}>
      <Heading textAlign="center" size="lg" {...heading} />
      <Grid
        mt={{ base: 10, lg: "4rem" }}
        gap={{ base: 10, lg: 20 }}
        templateColumns={{ lg: "repeat(3, 1fr)" }}
      >
        {features.map(({ heading, text, ...boxProps }, key) => (
          <Box
            maxW="320px"
            m="auto"
            textAlign={{ base: "center", md: "left" }}
            {...boxProps}
            key={boxProps.id || key}
          >
            <Heading mb={5} color="primary.500" {...heading} />
            <Text size="md" {...text} />
          </Box>
        ))}
      </Grid>
    </Section>
  );
};
