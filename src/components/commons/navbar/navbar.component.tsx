import { Button } from "@/ui/button";
import { BrandHorizontal } from "@/ui/icons/brand";
import { CloseIcon } from "@/ui/icons/close-icon";
import { HamburgerIcon } from "@/ui/icons/hamburger-icon";
import { Link } from "@/ui/link";
import { Box, Container, Flex, IconButton, useDisclosure } from "@chakra-ui/react";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      bg="white"
      as="nav"
      borderColor="gray.200"
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      left={0}
      zIndex="sticky"
    >
      <Container
        display={{ md: "flex" }}
        alignItems="center"
        justifyContent="space-between"
        maxW="container.lg"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Link href="/" display="inline-flex" alignItems="center" height="80px">
            <BrandHorizontal />
          </Link>
          <IconButton
            isRound
            colorScheme="primary"
            variant="ghost"
            size={"xl"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
        <NavMenu isOpen={isOpen} />
      </Container>
    </Box>
  );
};

interface NavMenuProps {
  isOpen: boolean;
}

const NavMenu = ({ isOpen }: NavMenuProps) => {
  return (
    <Box
      display={{ base: isOpen ? "flex" : "none", md: "flex" }}
      gap={{ base: 2, lg: 5 }}
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      pb={{ base: 5, md: 0 }}
    >
      <Link href="/sobre" display="inline-block" p={2}>
        Sobre nós
      </Link>
      <Button variant="outline" size="sm">
        Encontrar minha trip
      </Button>
    </Box>
  );
};
