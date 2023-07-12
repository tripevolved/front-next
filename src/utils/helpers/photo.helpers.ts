import type { Photo, PhotoSource } from "@/core/types";

const parseType = (type: string) => {
  return (
    {
      sm: "md",
      md: "lg",
      lg: "xl",
      xl: "xxl",
    }[type] || "md"
  );
};

type ParsedPhotos = Record<string, { src: string; height: number; width: number }>;

export const parsePhoto = ({ sources = [] }: Photo): ParsedPhotos =>
  sources.reduce(
    (acc, { type, url, ...props }) => ({ ...acc, [parseType(type)]: { src: url, ...props } }),
    {}
  );
