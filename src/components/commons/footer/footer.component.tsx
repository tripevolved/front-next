import { Heading } from "@/ui/heading";
import { BrandLettering } from "@/ui/icons/brand";
import { Instagram } from "@/ui/icons/instagram";
import { YouTube } from "@/ui/icons/youtube";
import { Link } from "@/ui/link";
import { Picture } from "@/ui/picture";
import { Section } from "@/ui/section";
import { Text } from "@/ui/text";
import { Box, Flex } from "@chakra-ui/react";

import AbavLogo from "@/public/assets/home/AbavLogo.png";
import CadasturLogo from "@/public/assets/home/CadasturLogo.png";

export const Footer = () => {
  return (
    <Section bg="brand.2" color="white">
      <Flex
        gap={{ base: 5 }}
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
      >
        <Box>
          <BrandLettering />
          <Text mt={3}>
            Utilizamos tecnologia para criar <br />
            experiências únicas.
          </Text>
        </Box>
        <Box pt={4}>
          <Heading size="xs" color="brand.4">
            Fale Conosco
          </Heading>
          <Box mt={6}>
            <Link href="mailto:info@tripevolved.com.br">
              info@tripevolved.com.br
            </Link>
          </Box>
        </Box>
        <Box pt={4}>
          <Heading size="xs" color="brand.4">
            Simulador
          </Heading>
          <Text mt={6}>
            <Link href="/sobre-nos">Simule sua trip</Link>
          </Text>
        </Box>
        <Box pt={4}>
          <Heading size="xs" color="brand.4">
            Siga nas redes
          </Heading>
          <Flex gap={1} mt={6} alignItems="center">
            <Link href="#">
              <Instagram />
            </Link>
            <Link href="#">
              <YouTube />
            </Link>
          </Flex>
        </Box>
        <Box pt={4} display="flex" justifyContent="center" flexDirection="column">
          <Picture centered src={CadasturLogo} width={385} height={5} />
          <Picture centered src={AbavLogo} width={225} height={27} mt={5} />
        </Box>
      </Flex>
    </Section>
  );
};
