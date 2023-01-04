// Need to Refact
import { ReactElement } from "react";

import { Heading, HeadingProps } from "@/ui/heading";
import { ImageBasicProps, Picture } from "@/ui/picture";
import { Text, TextProps } from "@/ui/text";
import { Section, SectionProps } from "@/ui/section";

import {
  Box,
  BoxProps,
  Divider,
  Grid,
  GridItem,
  Flex
} from "@chakra-ui/react";

export interface SectionFeaturesTwoColumnsProps
  extends SectionProps {
    columns: ColumnItemProps[];
    heading: HeadingProps;
}

export const SectionFeaturesTwoColumns = ({
  heading,
  columns = [],
  ...props
}: SectionFeaturesTwoColumnsProps): ReactElement => {
  return (
    <Section {...props}>
      {
        <>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            mb={5}
          >
            <Heading size="lg" as="h2" {...heading }/>
          </Box>
          <Flex
            alignContent="center"
            justifyContent="center"
            gap={{ lg: 20 }}
            flexDirection={{ base: "column", lg: "row" }}
          >
            {columns.map((column, key) => (
              <ColumnItem {...column} key={column.id || key} />
            ))}
          </Flex>
        </>
      }
    </Section>
  )
}

interface ColumnItemProps extends BoxProps {
  description: TextProps;
  features: FeatureItemProps[];
}

const ColumnItem = ({ description, features = [], ...props }: ColumnItemProps): ReactElement => {
  return (
    <Box max="480px" {...props}>
      <Text {...description} size="lg" />
      <Flex direction="column">
        {features.map((feature, key) => (
          <FeatureItem {...feature} key={feature.id || key} divider={key > 0}/>
        ))}
      </Flex>
    </Box>
  );
}

interface FeatureItemProps extends BoxProps {
  text: TextProps;
  image: ImageBasicProps;
  divider: boolean;
}


const FeatureItem = ({ divider, image, text, ...props }: FeatureItemProps): ReactElement => {
  return (
    <Box width="full" {...props}>
      {divider ? <Divider my={3} borderStyle="dashed" borderBottomWidth="2px" /> : null}
      <Grid py={3} px={2} gap={5} templateColumns="48px 1fr">
        <GridItem>
          <Picture {...image} />
        </GridItem>
        <GridItem>
          <Text size="md" {...text} /> 
        </GridItem>
      </Grid>
    </Box>
  )
}
