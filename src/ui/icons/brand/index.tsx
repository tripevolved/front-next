import brandHorizontal from "@/public/assets/brand/brand-horizontal.png";
import brandLettering from "@/public/assets/brand/brand-lettering.png";
import { Picture } from "@/ui/picture";

export const BrandLettering = () => {
  return <Picture src={brandLettering} height={43} width={186} />;
};

interface Brand {
  scale?: number;
}

export const BrandHorizontal = ({ scale = 1 }: Brand) => {
  return (
    <Picture src={brandHorizontal} height={34 * scale} width={178 * scale} />
  );
};
