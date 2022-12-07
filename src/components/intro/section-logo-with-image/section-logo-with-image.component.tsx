import { Section, SectionProps } from "@/ui/section";
import { Picture } from "@/ui/picture";
import decoration from "@/public/assets/intro/decoration.png";

import { Flex, Box } from "@chakra-ui/react";

export interface SectionLogoWithImageProps extends SectionProps {};

export const SectionLogoWithImage = ({ ...props }) => {
  return (
		<Section {...props}>
			<Flex width="full" direction="column">
				<Box
					width="full"
					py={20}
					alignContent="center"
				>
					<Picture
						src={decoration}
						height={150}
						width={150}
					/>
				</Box>
			</Flex>
		</Section>
	)
};