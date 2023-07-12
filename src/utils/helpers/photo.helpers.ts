import { Photo } from "@/core/types";

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

export const parsePhoto = ({ sources = [] }: Photo) =>
  sources.reduce(
    (acc, { type, url, ...props }) => ({ ...acc, [parseType(type)]: { src: url, ...props } }),
    {}
  );
