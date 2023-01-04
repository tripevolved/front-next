import { ReactElement } from "react";
import {
  SectionTwoColumns,
  SectionTwoColumnsProps,
} from "@/components/commons/section-two-columns";
import { Picture, PictureProps } from "@/ui/picture";
import { Heading, HeadingProps } from "@/ui/heading";

import { Box, BoxProps } from "@chakra-ui/react";
import {
  UnorderedList,
  ListItem,
  ListItemProps,
} from "@chakra-ui/react";

export interface SectionImageWithListProps
  extends  SectionTwoColumnsProps, BoxProps {
  image?: PictureProps;
  heading: HeadingProps;
  list: ListItemProps[];
  containerProps?: BoxProps;
}

export const SectionImageWithList = ({
  image,
  heading,
  containerProps,
  list = [],
  ...props
}: SectionImageWithListProps): ReactElement => {
  return (
    <SectionTwoColumns {...props}>
      { image ? <Picture {...image} style={{ maxWidth: "100vw" }} /> : null }
      <Box maxW="480px" textAlign={{ base: "center", lg: "left" }} {...containerProps}>
        <Heading {...heading} />
        <UnorderedList color="gray.1">
          {list.map((item, key) => (
            <ListItem {...item} key={item.id || key} my={4} />
          ))}
        </UnorderedList>
      </Box>
    </SectionTwoColumns>
  );
}
