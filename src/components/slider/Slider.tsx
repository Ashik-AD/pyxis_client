import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = (props: any) => {
  const responsive = {
    dekstopUlatra: {
      breakpoint: { max: 3000, min: 1920 },
      items: 12,
      slidesToSlide: 12,
    },
    desktopLarge: {
      breakpoint: { max: 1920, min: 1400 },
      items: 7,
      slidesToSlide: 7,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
      items: 6,
      slidesToSlide: 6,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4.5,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.1,
      slidesToSlide: 2,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      autoPlay={false}
      shouldResetAutoplay={false}
      swipeable={true}
    >
      {props.children}
    </Carousel>
  );
};

export default Slider;
