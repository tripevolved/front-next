import { Section, SectionProps } from "@/ui/section";
import { Box, Flex } from "@chakra-ui/react";

export interface SectionTwoColumnsProps extends SectionProps {
  reversed?: boolean;
}

export const SectionTwoColumns = ({
  reversed,
  children,
  gap,
  ...props
}: SectionTwoColumnsProps) => {
  return (
    <Section {...props}>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={gap || { lg: 20 }}
        flexDirection={{ base: "column", lg: reversed ? "row-reverse" : "row" }}
      >
        {Array.isArray(children) ? (
          children.map((child, key) =>
            child ? (
              <Box key={child.id || key} width={{ lg: "50%" }}>
                {child}
              </Box>
            ) : null
          )
        ) : (
          <Box maxW="480px" width={{ lg: "50%" }}>
            {children}
          </Box>
        )}
      </Flex>
    </Section>
  );
};
