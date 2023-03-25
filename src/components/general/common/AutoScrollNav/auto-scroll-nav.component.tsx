import type { AutoScrollNavProps } from "./auto-scroll-nav.types";

import classNames from "classnames";
import { Button } from "mars-ds";
import { useRef, useState } from "react";

export function AutoScrollNav({ children, className, draggable, ...props }: AutoScrollNavProps) {
  const [isDown, setIsDown] = useState(false);
  const cn = classNames("auto-scroll-nav", className, {
    "auto-scroll-nav--is-active": isDown,
    "auto-scroll-nav--draggable": draggable,
  });

  const sliderRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; //scroll-fast
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseLeave = () => setIsDown(false);

  const handleMouseUp = () => setIsDown(false);

  const walkToRight = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    e.stopPropagation();
    const left = sliderRef.current.scrollLeft + (sliderRef.current.clientWidth * 2/3);
    sliderRef.current.scrollTo({ behavior: "smooth", left });
  };

  const events = !draggable
    ? null
    : {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
      };

  return (
    <div ref={sliderRef} className={cn} {...props} {...events}>
      <div className="auto-scroll-nav__container">{children}</div>
      <div className="auto-scroll-nav__right-button">
        <Button onClick={walkToRight} iconName="arrow-right" style={{ padding: 16 }} variant="text" />
      </div>
    </div>
  );
};
