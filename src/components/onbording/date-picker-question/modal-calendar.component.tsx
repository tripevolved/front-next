import {
  Box,
  Flex,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Text } from "@/ui/text";

export const Calendar = ({}) => {
  return (
    <Box m={2}
      px={2}
      border="1px"
      borderColor="gray.3"
      borderRadius="6px"
      bg="white"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        py={3}
      >
        <Button
          colorScheme="primary"
          variant="link"
          fontSize={12}
        >
          Selecionar o mês inteiro 
        </Button>
        <Button
          colorScheme="primary"
          fontSize={10}
          px={4}
          height="22px"
        >
          OK
        </Button>
      </Flex>
      <Flex direction="row" justify="space-between" alignContent="center">
        <Box>
          <Button colorScheme="brand.1" variant="ghost">
            <FontAwesomeIcon icon={"arrow-left"} />
          </Button>
        </Box>
        <Box>
         <Text my={2} color="brand.2">Outubro</Text>
        </Box>
        <Box>
          <Button colorScheme="brand.1" variant="ghost">
            <FontAwesomeIcon icon={"arrow-right"} />
          </Button>
        </Box>
      </Flex>
    </Box>
  )
};
