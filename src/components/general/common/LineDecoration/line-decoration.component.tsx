import { LineDecorationProps } from "./line-decoration.types";

export const LineDecoration = ({ color = "currentColor", ...props }: LineDecorationProps) => {
  return (
    <div {...props}>
      <svg
        style={{ maxWidth: "100%" }}
        width="372"
        height="40"
        viewBox="0 0 372 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M182.67 30.8889C221.203 19.0758 309.638 0.756055 355.124 21.9826"
          stroke={color}
        />
      </svg>
    </div>
  );
};

