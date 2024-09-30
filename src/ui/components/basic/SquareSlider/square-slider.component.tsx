import type { SquareSliderProps } from "./square-slider.types";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import classNames from "classnames";
import { parseNumericValue } from "@/utils/helpers/css.helpers";
import { ToggleButton } from "mars-ds";
import Link from "next/link";

export const SquareSlider = ({
  children,
  className,
  height,
  hideDots,
  style,
  onSelect,
  currentIndex,
  ...props
}: SquareSliderProps) => {
  const filteredItems = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "camera",
      price: 200,
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Phone",
      price: 100,
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/12753820/pexels-photo-12753820.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Laptop",
      price: 500,
    },
    {
      id: 4,
      img: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Headephone",
      price: 40,
    },
    {
      id: 5,
      img: "https://images.pexels.com/photos/163117/keyboard-white-computer-keyboard-desktop-163117.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Keyboard",
      price: 140,
    },
    {
      id: 6,
      img: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Gaming Mouse",
      price: 140,
    },
  ];

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 235;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 235;
  };
  return (
    <>
      <div className="trending">
        <div className="container">
          <div className="title-btns">
            <h3></h3>
            <div className="btns">
              <ToggleButton
                variant="neutral"
                iconName="arrow-left"
                onClick={slideLeft}
              />
              <ToggleButton
                variant="neutral"
                iconName="arrow-right"
                onClick={slideRight}
              />
            </div>
          </div>
          <div className="row-container" id="slider">
            {children}
            {/* {filteredItems.map((item) => (
              <div key={item.id} className="row-item">
                <Link href={`/`} className="link">
                  <div className="item-header">
                    <img src={item.img} alt="product" />
                  </div>
                  <div className="item-description">
                    <p>{item.description}</p>
                    <p className="item-price">{item.price}$</p>
                  </div>
                </Link>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export const SquareSliderCarousel = ({
  children,
  className,
  height,
  hideDots,
  style,
  onSelect,
  currentIndex,
  ...props
}: SquareSliderProps) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const computedStyle = { "--height": parseNumericValue(height), ...style };
  const cn = classNames("square-slider", className);

  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const handleSelect = useCallback(() => {
    if (!embla) return;
    const newIndex = embla.selectedScrollSnap();
    setSelectedIndex(newIndex);
    onSelect?.(newIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    handleSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", handleSelect);
  }, [embla, setScrollSnaps, handleSelect]);

  useEffect(() => {
    if (typeof currentIndex === "number" && currentIndex !== selectedIndex) {
      scrollTo(currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className={cn} {...props} ref={viewportRef} style={computedStyle}>
      <div className="square-slider__container">{children}</div>

      {!hideDots && scrollSnaps.length > 1 && (
        <div className="square-slider__dots dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={classNames("dots__button", {
                "dots__button--is-current": index === selectedIndex,
              })}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
