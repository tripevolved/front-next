import type { CarouselProps } from "@/ui";

jest.mock("@/ui/components/basic/Carousel", () => ({
  Carousel: ({ children }: CarouselProps) => <div data-testid="carousel">{children}</div>,
}));
