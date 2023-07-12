export interface Photo {
  title: string;
  alt?: string;
  sources: PhotoSource[];
}

export type PhotoType = "md" | "lg" | "xl" | "xxl";

export interface PhotoSource {
  width: number;
  height: number;
  url: string;
  type: PhotoType;
}
