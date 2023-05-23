export type ComponentHTMLProps<T = HTMLElement> = Omit<
  React.HTMLAttributes<T>,
  "title" | "size"
> & {
  sx?: any;
};
