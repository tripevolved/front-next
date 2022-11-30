import {
  SectionWithImage,
  SectionWithImageProps,
} from "@/components/commons/section-with-image";
import { Text, TextProps } from "@/ui/text";
import { Title, TitleProps } from "@/ui/title";
import { Button, ButtonProps, Row } from "@nextui-org/react";
import Image from "next/image";

interface SectionHeroProps
  extends Omit<SectionWithImageProps, "children" | "title"> {
  title: TitleProps;
  text: TextProps;
  cta: ButtonProps;
}

export const SectionHero = ({
  title,
  text,
  cta,
  image,
  ...props
}: SectionHeroProps) => {
  return (
    <SectionWithImage image={image} {...props}>
      <Title h1 {...title} />
      <Image
        width={372}
        height={40}
        alt="linha de separação"
        src="/assets/home/img-line.svg"
      />
      <Text size="$xl" css={{ mb: "$xl" }} {...text} />
      <Row css={{ "@mdMax": { justifyContent: "center" } }}>
        <Button rounded size="lg" {...cta} />
      </Row>
    </SectionWithImage>
  );
};
