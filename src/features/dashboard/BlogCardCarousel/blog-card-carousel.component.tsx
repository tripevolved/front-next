import { Box, CardBlog, CardBlogProps, Text } from "@/ui";
import type { BlogCardCarouselProps } from "./blog-card-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";

const blogPostList: CardBlogProps[] = [
  {
    coverImg: "https://fakeimg.pl/260x153/?text=Post 1",
    postTitle: "As igrejas imperdiveis de Ouro Preto",
    categories: [
      {
        description: "Destinos",
        color: "#0AB9AD",
      },
      {
        description: "Brasil",
        color: "#F5AC0A",
      },
    ],
  },
  {
    coverImg: "https://fakeimg.pl/260x153/?text=Post 2",
    postTitle: "Faça um tour pelos Sabores da Bahia",
    categories: [
      {
        description: "Destinos",
        color: "#0AB9AD",
      },
    ],
  },
  {
    coverImg: "https://fakeimg.pl/260x153/?text=Post 3",
    postTitle: "Aventuras Florestais na Amazônia",
    categories: [
      {
        description: "Destinos",
        color: "#0AB9AD",
      },
    ],
  },
  {
    coverImg: "https://fakeimg.pl/260x153/?text=Post 4",
    postTitle: "Aventuras Florestais na Amazônia",
    categories: [
      {
        description: "Destinos",
        color: "#0AB9AD",
      },
    ],
  },
];

export function BlogCardCarousel({
  className,
  children,
  title,
  sx,
  ...props
}: BlogCardCarouselProps) {
  const cn = makeCn("blog-card-carousel", className)(sx);

  return (
    <Box className={cn} {...props}>
      <Text variant="heading">{title}</Text>
      <Box className="blog-card-carousel__row">
        <Box className="blog-card-carousel__row__container">
          {blogPostList.map((post, i) => (
            <CardBlog {...post} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
