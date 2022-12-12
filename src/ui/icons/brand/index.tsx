import { Picture } from "@/ui/picture";

export const BrandLettering = () => {
  return <Picture src="/assets/brand/brand-lettering.png" height={43} width={186} />;
};

interface Brand {
  scale?: number;
}

export const BrandHorizontal = ({ scale = 1 }: Brand) => {
  return <Picture src="/assets/brand/brand-horizontal.png" height={34 * scale} width={178 * scale} />;
};
