import React, { useContext, FC, useEffect } from "react";
import Carousel from "react-multi-carousel";

import { STORE_KEY } from "../../store/storeType";
import { cleanupTv } from "../../utils/cleanupTv";
import { TvFullPageSlideProps } from "../types/tv.type";
import { StoreContext } from "../../store/Store";
import { ax } from "../../config/default";
import FullPage from "../mainSlide/FullPage";
import FullPagePropsType from "../types/fullpage";
import SkeletonFullSlideHeading from "../skeleton/SkeletonFullSlideHeading";
const carouselOptions = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const FullPageSlide: FC<PropTypes> = ({ url, store_key, media_type }) => {
  const { store, dispatch } = useContext(StoreContext);
  useEffect(() => {
    let fetchItems = null;
    if (!store[store_key]) {
      fetchItems = async () => {
        const { data } = await ax.get(url);
        dispatch({
          type: media_type === "movie" ? "SET_MOVIE_FULL" : "SET_TV_FULL",
          payload: data,
        });
      };
      fetchItems();
    }
    return () => {
      fetchItems = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!store[store_key]) return null;
  if (!store.movie_full) {
    return <SkeletonFullSlideHeading />;
  }
  return (
    <Carousel
      responsive={carouselOptions}
      autoPlaySpeed={10000}
      infinite={true}
      autoPlay={true}
      arrows={false}
    >
      {store[store_key] &&
        (media_type === "movie"
          ? store.movie_full.map((el: FullPagePropsType) => (
              <FullPage
                key={el.id}
                {...el}
                media_type="movie"
                detail_url={getDetailUrl(el.id, media_type, el.title)}
                trailer_url={`trailer/${media_type}/${el.id}`}
              />
            ))
          : cleanupTv(store.tv_full).map((el: TvFullPageSlideProps) => (
              <FullPage
                key={el.id}
                {...el}
                media_type="tv"
                backdrop={el.backdrop}
                detail_url={getDetailUrl(el.id, media_type, el.title)}
                trailer_url={`trailer/${media_type}/${el.id}`}
              />
            )))}
    </Carousel>
  );
};
const getDetailUrl = (
  id: number | string,
  media_type: string,
  title: string
): string => {
  return `${media_type}/info/${id}-${title.replaceAll(" ", "-")}`;
};
interface PropTypes extends STORE_KEY {
  url: string;
  media_type: "movie" | "tv";
}
export default React.memo(FullPageSlide);
