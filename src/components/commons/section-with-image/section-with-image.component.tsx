import { Section, SectionProps } from "@/ui/section";
import { Grid, Image, ImageProps } from "@nextui-org/react";

export interface SectionWithImageProps extends SectionProps {
  image: ImageProps;
}

export const SectionWithImage = ({
  children,
  image,
  ...props
}: SectionWithImageProps) => {
  const { width, height, ...imageProps } = image;
  return (
    <Section {...props}>
      <Grid.Container
        alignItems="center"
        justify="space-between"
        css={{ "@mdMax": { flexDirection: "column-reverse" } }}
      >
        <Grid
          md={5}
          direction="column"
          css={{ "@mdMax": { textAlign: "center" } }}
        >
          {children}
        </Grid>
        <Grid md={6}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            autoResize
            {...imageProps}
            css={{
              maxW: "100%",
              width,
              height,
            }}
          />
        </Grid>
      </Grid.Container>
    </Section>
  );
};
