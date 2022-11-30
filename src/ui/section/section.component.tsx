import { Container, ContainerProps } from "@nextui-org/react";

export interface SectionProps
  extends Pick<ContainerProps, "css">,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
}

export const Section = ({ children, css, backgroundColor }: SectionProps) => {
  return (
    <Container
      md
      as="section"
      css={{
        py: "$xl",
        "@md": { py: "$2xl" },
        "@lg": { py: "$3xl" },
        "@xl": { py: "$4xl" },
        backgroundColor,
        ...css,
      }}
    >
      {children}
    </Container>
  );
};
