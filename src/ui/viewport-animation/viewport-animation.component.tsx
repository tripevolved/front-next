import cls from "classnames";
import { useMemo, useRef } from "react";
import { useInViewport } from "react-in-viewport";

export type EnterAnimation =
  | "slide-down"
  | "slide-up"
  | "slide-left"
  | "slide-right";

interface ViewportAnimationProps {
  enterAnimation?: EnterAnimation;
  children?: React.ReactNode;
}

export const ViewportAnimation = ({
  enterAnimation,
  children,
}: ViewportAnimationProps) => {
  if (!enterAnimation) return <>{children}</>;
  return (
    <_ViewportAnimation enterAnimation={enterAnimation}>
      {children}
    </_ViewportAnimation>
  );
};

const _ViewportAnimation = ({
  enterAnimation,
  children,
}: ViewportAnimationProps) => {
  const ref = useRef(null);
  const { enterCount } = useInViewport(ref, { rootMargin: "-150px" });

  const inViewport = useMemo(() => enterCount > 0, [enterCount]);

  return (
    <div
      className={cls("animate__slide", {
        [`animate__${enterAnimation}`]: inViewport,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
};
