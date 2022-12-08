import { Section, SectionProps } from "@/ui/section";
import { Heading, HeadingProps } from "@/ui/heading";
import { Text, TextProps } from "@/ui/text";
import { Picture } from "@/ui/picture";
import { Button, ButtonProps } from "@/ui/button";
import hiFiveDecorarion from "@/public/assets/intro/hiFiveDecoration.png";

import { Box } from "@chakra-ui/react";

export interface SectionIntroDescriptionProps extends SectionProps {
	title: HeadingProps;
	description: TextProps;
	cta: ButtonProps;
};

export const SectionIntroDescription = ({ title, description, cta, ...props }: SectionIntroDescriptionProps) => {
  return (
		<Section {...props}>
			<Box
				width="full"
				maxWidth={355}
				pt={5}
				alignContent="center"
				textAlign="center"
				mx={"auto"}
			>
				<Box display="flex" flexDirection="row" justifyContent="center">
					<Heading {...title} />
						<Picture
							src={hiFiveDecorarion}
							height={25}
							width={25}
						/>
				</Box>
				<Text textColor={"gray.1"} mt={5} {...description} />
				<Button mt={10} {...cta} />
			</Box>
		</Section>
	)
};