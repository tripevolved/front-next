export type ImageSelectProps = {
  name: string;
  imageUrl: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};
