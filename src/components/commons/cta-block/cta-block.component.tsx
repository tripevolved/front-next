import { Button, ButtonProps } from "@/ui/button";
import { Heading, HeadingProps } from "@/ui/heading";
import { Text, TextProps } from "@/ui/text";
import { Box, BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface CtaBlockProps extends BoxProps {
  heading: HeadingProps;
  text: TextProps;
  cta?: ButtonProps;
}

export const CtaBlock = ({ heading, text, cta, ...props }: CtaBlockProps) => {
  const router = useRouter();

  const handleCta = () => {
    router.push("/intro");
  }

  return (
    <Box maxW="480px" textAlign={{ base: "center", lg: "left" }} {...props}>
      <Heading size="lg" as="h2" {...heading} />
      <Text size="lg" textColor={"gray.1"} mt={5} {...text} />
      {cta ? <Button mt={10} {...cta} onClick={handleCta} /> : null}
    </Box>
  );
};
