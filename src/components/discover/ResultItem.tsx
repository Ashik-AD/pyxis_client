import React from "react";
import { Link } from "react-router-dom";
import { imageUrl, imageUrlWithSize } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";

const ResultItem: React.FC<PropTypes> = (props) => {
  const {
    id,
    title,
    media_type,
    poster,
    poster_path,
    vote_average,
    release_date,
    first_air_date,
    count,
    include,
    name,
  } = props;
  return (
    <Link
      to={`/${media_type}/info/${id}-${
        title ? title.replaceAll(" ", "-") : name.replaceAll(" ", "-")
      }`}
      key={id}
      title={title}
      className="flex items-center gap-20 color-white hover-bg-fade p-6 rounded-regular"
    >
      <span className="font-bold text-xsm sm:text-regular px-6">{count}</span>
      <img
        src={poster ? imageUrlWithSize(poster, "92") : noImage.default}
        alt={title ? title : name}
        style={{ height: 100, width: 70 }}
        className="rounded-regular"
      />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <span className="font-semibold text-sm sm:text-regular truncate">
            {title ? title : name}
          </span>
          <span className="capitalize text-xsm">{media_type}</span>
        </div>
        <div className="capitalize text-xsm sm:text-regular font-semibold sm:font-medium flex flex-col color-gray">
          {vote_average > 0 && `${vote_average} • `}
          {release_date ? release_date : first_air_date}
          {include && <span>{include}</span>}
        </div>
      </div>
    </Link>
  );
};

interface PropTypes {
  media_type: string;
  id: number | string;
  title: string;
  name: string;
  poster: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  count: string;
  include: string;
}

export default ResultItem;
