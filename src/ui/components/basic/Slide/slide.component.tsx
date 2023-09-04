import type { SlideProps } from "./slide.types";

import { makeCn, parseNumericValue } from "@/utils/helpers/css.helpers";

import { Picture, Text } from "@/ui";
import { Button } from "mars-ds";

export const Slide = ({
  overline,
  title,
  text,
  buttons,
  children,
  className,
  backgroundColor,
  color,
  backgroundImage,
  style,
  height,
  container,
  ...props
}: SlideProps) => {
  const cn = makeCn("slide", className, `slide--is-container-${container}`)();
  const styleComputed = { backgroundColor, color, "--height": parseNumericValue(height), ...style };
  return (
    <div className={cn} {...props} style={styleComputed}>
      <div className="slide__background-image">
        {backgroundImage ? <Picture>{backgroundImage}</Picture> : null}
      </div>
      <div className="slide__content">
        {overline && (
          <Text className="slide__content__overline" size="sm">
            {overline}
          </Text>
        )}
        {title && (
          <Text heading size="md" className="mb-sm">
            {title}
          </Text>
        )}
        {text && <Text>{text}</Text>}
        {Array.isArray(buttons) ? (
          <div className="mt-xl">
            {buttons.map((button, key) => (
              <Button key={button.label || key} {...button} />
            ))}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};
