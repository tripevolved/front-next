import { Heading, HeadingProps } from "@/ui/heading";
import { MinusCircle } from "@/ui/icons/minus-circle";
import { PlusCircle } from "@/ui/icons/plus-circle";
import { Text, TextProps } from "@/ui/text";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export interface AccordionListProps {
  items: AccordionItemProps[];
}

export interface AccordionItemProps {
  id?: string;
  heading: HeadingProps;
  text: TextProps;
}

export const AccordionList = ({ items = [] }: AccordionListProps) => {
  if (Array.isArray(items) && items.length === 0) return null;
  return (
    <Accordion allowToggle>
      {items.map(({ heading, text, id }, key) => (
        <AccordionItem key={id || key} py={2}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                py={3}
                className="color-primary"
                _hover={{
                  backgroundColor: "transparent",
                  color: "primary.600",
                }}
              >
                <Box flex="1" textAlign="left">
                  <Heading as="h3" size="xs" {...heading} />
                </Box>
                {isExpanded ? <MinusCircle /> : <PlusCircle />}
              </AccordionButton>
              <AccordionPanel>
                <Text size="sm" color="gray.700" {...text} />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
