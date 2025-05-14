import type { Photo, PhotoSource } from "@/core/types";

const parseType = (type: string) => {
  const formattedType = type && type.toLowerCase();
  console.log(formattedType)
  return (
    {
      sm: "md",
      md: "lg",
      lg: "xl",
      xl: "xxl",
    }[type || formattedType] || "md"
  );
};

type ParsedPhotos = Record<string, { src: string; height: number; width: number }>;

export const parsePhoto = ({ sources = [] }: Photo): ParsedPhotos =>
  sources.reduce(
    (acc, { type, url, ...props }) => ({ ...acc, [parseType(type)]: { src: url, ...props } }),
    {}
  );

export const parsePhotoWithType = ({ sources = [] }: Photo): ParsedPhotos =>
  sources.reduce(
    (acc, { type, url, ...props }) => ({ ...acc, [type]: { src: url, ...props } }),
    {}
  );
