import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Carousel from 'react-multi-carousel';

import { RiPlayMiniFill } from 'react-icons/ri';
const carouselOptions = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
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
    <Carousel
      responsive={carouselOptions}
      autoPlay={false}
      shouldResetAutoplay={true}>
      {data.results.map((el: any) => (
        <div
          key={el.id}
          className='flex content-center h-200 bg-cover cursor-pointer hover-scaleup transition-1 mx-6'
          style={{
            background: `url(https://i.ytimg.com/vi/${el.key}/hqdefault.jpg)`,
            backgroundPosition: 'center',
          }}
          onClick={() => handleNav(el.key)}>
          <span
            className='rounded-full flex content-center text-heading overflow-hidden hover-fade-half'
            style={{ background: props.color, height: 40, width: 40 }}>
            <RiPlayMiniFill />
          </span>
        </div>
      ))}
    </Carousel>
  );
};

export default TrailerLists;
