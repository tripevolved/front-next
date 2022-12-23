import { ReactElement } from "react";
import { Section, SectionProps } from "@/ui/section";
import { Heading, HeadingProps } from "@/ui/heading";
import { PictureProps, Picture } from "@/ui/picture";

import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export interface SectionTechnologiesProps extends SectionProps {
  heading: HeadingProps;
  technologies: PictureProps[];
}

export const SectionTechnologies = ({
  heading,
  technologies = [],
  ...props
}: SectionTechnologiesProps): ReactElement => {
  return (
    <Section {...props}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        mb={5}
      >
        <Heading size="lg" as="h2" {...heading } />
      </Box>
      <SimpleGrid columns={[2, null, 3]}>
        {technologies.map((technolgy, key) => (
          <Picture {...technolgy} key={technolgy.id || key} centered mx={2} />
        ))}
      </SimpleGrid>
    </Section>
  )
}
