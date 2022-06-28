import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderArrow = React.lazy(() => import("../slider/SliderArrow"));
import Slider from "react-slick";
import { RiPlayMiniFill } from "react-icons/ri";
const settings = {
  dots: false,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 1620,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 670,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
const TrailerLists: React.FC<{ url: string; color?: string }> = (props) => {
  const { data, loading, error } = useFetch(props.url);
  const navigation = useNavigate();
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (data === null) return <h1>No Videos</h1>;
  const handleNav = (id: string) => {
    navigation(`trailer/${id}`, { replace: true });
  };
  return (
    <Slider
      // shouldResetAutoplay={true}
      {...settings}
    >
      {data.results.map((el: any) => (
        <div
          key={el.id}
          className="flex content-center h-200 bg-cover cursor-pointer hover-scaleup transition-1 mx-6"
          style={{
            background: `url(https://i.ytimg.com/vi/${el.key}/hqdefault.jpg)`,
            backgroundPosition: "center",
          }}
          onClick={() => handleNav(el.key)}
        >
          <span
            className="rounded-full flex content-center text-heading overflow-hidden hover-fade-half"
            style={{ background: props.color, height: 40, width: 40 }}
          >
            <RiPlayMiniFill />
          </span>
        </div>
      ))}
    </Slider>
  );
};

export default TrailerLists;
