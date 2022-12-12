import { Section, SectionProps } from "@/ui/section";
import { Heading, HeadingProps } from "@/ui/heading";
import { Text, TextProps } from "@/ui/text";
import { Picture } from "@/ui/picture";
import { Button, ButtonProps } from "@/ui/button";
import { Box } from "@chakra-ui/react";

export interface SectionIntroDescriptionProps extends SectionProps {
  title: HeadingProps;
  description: TextProps;
  cta: ButtonProps;
}

export const SectionIntroDescription = ({
  title,
  description,
  cta,
  ...props
}: SectionIntroDescriptionProps) => {
  return (
    <Section {...props}>
      <Box
        width="full"
        maxWidth={355}
        alignContent="center"
        textAlign="center"
        mx={"auto"}
        borderTopLeftRadius={{ base: "45px" }}
      >
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Heading {...title} />
          <Picture src="/assets/intro/hiFiveDecoration.png" height={25} width={25} />
        </Box>
        <Text textColor={"gray.1"} mt={5} {...description} />
        <Button mt={[10, 15, 30]} {...cta} />
      </Box>
    </Section>
  );
};
