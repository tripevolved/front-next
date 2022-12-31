import {
  Slider,
  SliderProps as _SliderProps,
  SliderTrack,
  SliderThumb,
  SliderMark,
  SliderMarkProps as _SliderMarkProps,
} from "@chakra-ui/react";

export interface SliderQuestionProps extends _SliderProps {
  marks?: MarkProps[];
}

export interface MarkProps extends _SliderMarkProps {
  ml: string | number;
}

export const SliderQuestion = ({ marks, ...props }: SliderQuestionProps) => {
  return (
    <Slider {...props} mx={2}>
      {marks?.map((mark, key) => (
        <SliderMark {...mark} key={key} mt={4} />
      ))}
      <SliderTrack bg="brand.1" />
      <SliderThumb bg="brand.1" />
    </Slider>
  );
}