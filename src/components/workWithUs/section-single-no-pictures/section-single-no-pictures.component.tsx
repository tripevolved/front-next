import { ReactElement } from "react";

import { Section, SectionProps } from "@/ui/section";
import { Heading, HeadingProps } from "@/ui/heading";
import { Text, TextProps } from "@/ui/text";
import { Button, ButtonProps } from "@/ui/button";

import { Box, BoxProps } from "@chakra-ui/react";

export interface SectionSingleNoPicturesProps
  extends SectionProps, BoxProps {
  containerProps: BoxProps;
  heading: HeadingProps;
  text: TextProps;
  cta: ButtonProps;
}

export const SectionSingleNoPictures = ({
  containerProps,
  heading,
  text,
  cta,
  ...props
}: SectionSingleNoPicturesProps): ReactElement => {
  return (
    <Section {...props}>
      <Box maxW="480px" {...containerProps}>
        <Heading {...heading} />
        <Text {...text} />
        <Button {...cta}/>
      </Box>
    </Section>
  )
}
