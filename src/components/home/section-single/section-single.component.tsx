import { CtaBlock, CtaBlockProps } from "@/components/commons/cta-block";
import { Picture } from "@/ui/picture";
import { Section, SectionProps } from "@/ui/section";

import decoration1 from "@/public/assets/home/decoration1.png";
import decoration2 from "@/public/assets/home/decoration2.png";
import { Box, Flex } from "@chakra-ui/react";

export interface SectionSingleProps extends SectionProps, CtaBlockProps {}

export const SectionSingle = ({ heading, text, ...props }: SectionSingleProps) => {
  return (
    <Section {...props}>
      <Flex maxW="480px" m="auto" direction="column" position="relative">
        <Box alignSelf="flex-end" position={{ lg: "absolute" }} top="-75px" right="-150px">
          <Picture
            className="animate__float"
            src={decoration1}
            height={150}
            width={150}
            mt={{ base: "-50px", md: 0 }}
          />
        </Box>
        <CtaBlock heading={heading} text={text} />
        <Picture
          className="animate__float animate__delay-1x"
          src={decoration2}
          height={150}
          width={150}
          position={{ lg: "absolute" }}
          bottom="-75px"
          left="-150px"
          mb={{ base: "-50px", md: 0 }}
        />
      </Flex>
    </Section>
  );
};
