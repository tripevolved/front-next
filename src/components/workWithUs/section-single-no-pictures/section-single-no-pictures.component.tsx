import { ReactElement } from "react";

import { Section, SectionProps } from "@/ui/section";
import { Heading, HeadingProps } from "@/ui/heading";
import { Text, TextProps } from "@/ui/text";
import { Button, ButtonProps } from "@/ui/button";
import { LinkProps, Link } from "@/ui/link";

import { Box, BoxProps } from "@chakra-ui/react";

export interface SectionSingleNoPicturesProps
  extends SectionProps, BoxProps {
  containerProps: BoxProps;
  heading: HeadingProps;
  text: TextProps;
  cta: LinkProps;
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
        <Link {...cta} style={{ textDecoration: "none" }}/>
      </Box>
    </Section>
  )
}
