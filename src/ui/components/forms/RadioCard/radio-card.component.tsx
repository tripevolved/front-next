import Image from "next/image";
import { RadioCardProps } from "./radio-card.types";

export function RadioCard({ image, description, onClick }: RadioCardProps) {
  return (
    <>
      <div
        className="flex flex-row items-center border border-[#E0E0E0] gap-4 rounded-xl"
        style={{
          padding: "20px",
          maxWidth: 360,
        }}
      >
        <div className="flex flex-row items-start relative gap-3">
          <input type="radio" className="w-5 h-5" onClick={onClick} />
          <Image
            width={120}
            height={100}
            src={image}
            alt="Simple Selection"
            className="rounded-xl object-cover"
          />
        </div>

        <p className="text-left flex-1 flex-wrap">{description}</p>
      </div>
    </>
  );
}
