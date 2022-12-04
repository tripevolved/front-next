import { CtaBlock, CtaBlockProps } from "@/components/commons/cta-block";
import {
  SectionTwoColumns,
  SectionTwoColumnsProps,
} from "@/components/commons/section-two-columns";
import { Heading, HeadingProps } from "@/ui/heading";
import { ImageBasicProps, Picture } from "@/ui/picture";
import { Text, TextProps } from "@/ui/text";
import { Box, BoxProps, Divider, Grid, GridItem } from "@chakra-ui/react";

export interface SectionFeaturesProps
  extends SectionTwoColumnsProps,
    CtaBlockProps {
  features: FeatureItemProps[];
}

export const SectionFeatures = ({
  heading,
  text,
  features = [],
  ...props
}: SectionFeaturesProps) => {
  return (
    <SectionTwoColumns {...props}>
      <CtaBlock heading={heading} text={text} />
      <>
        {features.map((item, key) => (
          <FeatureItem {...item} key={item.id || key} divider={key > 0} />
        ))}
      </>
    </SectionTwoColumns>
  );
};

interface FeatureItemProps extends BoxProps {
  heading: HeadingProps;
  text: TextProps;
  image?: ImageBasicProps;
  divider?: boolean;
}

const FeatureItem = ({
  heading,
  text,
  image,
  divider,
  ...props
}: FeatureItemProps) => {
  return (
    <Box maxW="480px" {...props}>
      {divider ? (
        <Divider my={3} borderStyle="dashed" borderBottomWidth="2px" />
      ) : null}
      <Grid py={3} px={2} gap={5} templateColumns="48px 1fr">
        <GridItem>
          <Picture {...image} />
        </GridItem>
        <GridItem>
          <Heading as="h3" size="sm" mb={1} {...heading} />
          <Text size="md" {...text} />
        </GridItem>
      </Grid>
    </Box>
  );
};
