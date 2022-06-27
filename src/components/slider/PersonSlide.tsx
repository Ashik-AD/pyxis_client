import React from "react";

import Carousel from "react-multi-carousel";
import useFetch from "../../hooks/useFetch";
import { imageUrlWithSize } from "../../utils/imageUrl";
import PersonCard from "../cards/PersonCard";
export const carouselOptions = {
  responsive: {
    desktopLarge: {
      breakpoint: { max: 3000, min: 1920 },
      items: 12,
      slidesToSlide: 10,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  },
  autoPlay: false,
  swipeable: true,
  pauseOnHover: true,
  autoPlaySpeed: 10000,
  partialVisible: true,
  shouldResetAutoplay: true,
};
const PersonSlide: React.FC<PropTypes> = (props) => {
  let { data, loading, error } = useFetch(props.url);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <h1>Something went wrong</h1>;
  if (!props.url) {
    data = props.items;
  }
  return (
    <Carousel {...carouselOptions}>
      {data.map((el: any) => (
        <PersonCard
          id={el.id}
          person_name={el.name}
          profile_img={
            el.profile_path ? imageUrlWithSize(el.profile_path, "154") : ""
          }
          character={el.character}
          color={props.color}
          key={el.id}
          gender={el.gender}
        />
      ))}
    </Carousel>
  );
};
interface PropTypes {
  url: string;
  color?: string;
  items?: any[];
}
export default PersonSlide;
