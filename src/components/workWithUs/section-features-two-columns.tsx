// Need to Refact
import React from "react";
import {
  SectionTwoColumns,
  SectionTwoColumnsProps
} from "@/components/commons/section-two-columns";
import { Heading, HeadingProps } from "@/ui/heading";
import { ImageBasicProps, Picture } from "@/ui/picture";
import { Text, TextProps } from "@/ui/text";

import { Box, BoxProps, Divider, Grid, GridItem } from "@chakra-ui/react";

export interface SectionFeaturesTwoColumnsProps
  extends SectionTwoColumnsProps {
    features: FeatureItemProps[];
    heading: HeadingProps;
}

export const SectionFeaturesTwoColumns = ({
  heading,
  features = [],
  ...props
}: SectionFeaturesTwoColumnsProps) => {
  return (
    <SectionTwoColumns {...props}>

    </SectionTwoColumns>
  )
}
