import React from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";
import { CardPropTypes } from "../types/movie";
import ProgressCircle from "../progress/ProgressCircle";
import formatDate from "../../utils/formatDate";
const CardRegular: React.FC<CardPropTypes> = (props) => {
  const {
    title,
    poster,
    url,
    containerStyle,
    imageStyle,
    vote_average,
    release_date,
  } = props;

  return (
    <Link
      to={url}
      className={`flex flex-col gap-10 cursor-pointer color-white overflow-x-hidden p-6 sm:p-10 hover-fade-half ${
        containerStyle ? containerStyle : ""
      }`}
      title={title}
    >
      <div
        className={`relative poster_wrapper w-full rounded-lg overflow-hidden ${
          imageStyle && imageStyle
        }`}
      >
        <img
          src={poster ? imageUrl(poster) : noImage.default}
          alt={title}
          className="h-full w-full rounded-lg"
        />
        <ProgressCircle
          radius={40}
          strokeWidth={10}
          value={vote_average ? vote_average : 0}
          styles="absolute bottom-0 left-0"
        />
        <span
          className="absolute left-0 w-full h-100 z-0"
          style={{
            background: "linear-gradient(0deg, #000, transparent)",
            bottom: 0,
          }}
        ></span>
      </div>
      <div className="flex flex-col gap-10">
        <span className="font-medium truncate sm:text-sm text-xsm">
          {title}
        </span>
        <span className="text-xsm font-semibold color-gray">
          {formatDate(release_date)}
        </span>
      </div>
    </Link>
  );
};

export default CardRegular;
