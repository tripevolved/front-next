import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

interface LinkProps extends ChakraLinkProps {}

export const Link = (props: LinkProps) => {
  return <ChakraLink {...props} as={NextLink} />;
};
