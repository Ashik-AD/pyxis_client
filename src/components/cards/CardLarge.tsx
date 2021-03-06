import React from "react";
import { CardPropTypes } from "../types/movie";
import { Link } from "react-router-dom";
import { noImage } from "../../utils/noImage";
import { imageUrlWithSize } from "../../utils/imageUrl";
import ProgressCircle from "../progress/ProgressCircle";
import formatDate from "../../utils/formatDate";
const CardLarge: React.FC<CardPropTypes> = (props) => {
  const { title, url, backdrop, release_date, vote_average } = props;
  return (
    <Link
      to={url}
      className="flex cursor-pointer rounded- color-white overflow-hidden mx-6 sm:mx-10"
      title={title}
    >
      <div
        className="poster_wrapper flex w-full h-150 sm:h-200 rounded-xlg bg-center bg-cover no-repeat relative overflow-hidden hover-fade-half transition "
        style={{
          background: `linear-gradient(0deg, #000 10%, transparent), url(${
            backdrop ? imageUrlWithSize(backdrop, "342") : noImage.default
          })`,
        }}
      >
        <div
          className="absolute flex content-bottom w-full bottom-0 left-0 px-20"
          style={{
            height: "50%",
            paddingBottom: 10,
          }}
        >
          <div className="flex w-full flex-col sm:flex-row  sm:align-center">
            <ProgressCircle
              radius={40}
              strokeWidth={15}
              value={vote_average ? vote_average : 0}
              labelStyles="text-xsm"
            />
            <div className="flex flex-col sm:px-10 overflow-hidden">
              <span className="text-regular font-medium py-6 truncate sm:text-medium">
                {title}
              </span>
              <span className="capitalize font-bold color-gray text-xsm sm:text-sm">
                {formatDate(release_date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardLarge;
