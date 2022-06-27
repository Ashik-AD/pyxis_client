import React, { ReactElement } from "react";
import Carousel from "react-multi-carousel";

const SlideOption = {
  desktopUltra: {
    breakpoint: { max: 3000, min: 1920 },
    items: 6.2,
    slidesToSlide: 5,
  },
  desktopLarge: {
    breakpoint: { max: 1920, min: 1400 },
    items: 4.2,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 3.2,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2.3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.1,
    slidesToSlide: 1,
  },
};

const SliderLg: React.FC<{ children: ReactElement[] }> = (props) => {
  return (
    <Carousel
      responsive={SlideOption}
      autoPlay={false}
      shouldResetAutoplay={false}
      swipeable={true}
    >
      {props.children}
    </Carousel>
  );
};

export default SliderLg;
