import Image from "next/image";
import { ImageSelectProps } from "./image-select.types";

export function ImageSelect({ onClick, selected, disabled, name, imageUrl }: ImageSelectProps) {
  return (
    <>
      <div
        className="image__select__component__container"
        style={{
          cursor: disabled && !selected ? "default" : "pointer",
        }}
        onClick={onClick}
      >
        <div style={{ position: "relative" }}>
          <Image
            key={name}
            className="image__select__component__destination__image"
            alt="Destination"
            src={imageUrl}
            width={105}
            height={105}
            style={{
              border: selected ? "3px solid #0ab9ad" : "none",
              filter: disabled && !selected ? "grayscale(100%)" : "none",
            }}
          />
          <div
            className="option-field option-field--is-multiselect top-1 right-1 border-white image__select__checkbox__container"
            style={{
              cursor: disabled && !selected ? "default" : "pointer",
            }}
          >
            <input
              type="checkbox"
              className="image__select__checkbox"
              style={{
                cursor: disabled && !selected ? "default" : "pointer",
              }}
              defaultChecked={selected}
              disabled={disabled}
              onClick={onClick}
            />
            <span
              className="option-field__state"
              style={{
                borderColor: selected ? "#0ab9ad" : "white",
                cursor: disabled && !selected ? "default" : "pointer",
              }}
              data-checked={selected}
            />
          </div>
        </div>
        <span>{name}</span>
      </div>
    </>
  );
}
