import React from "react";
import useFetch from "../../hooks/useFetch";
import selectedPeople from "../../utils/selectedPeople";
import { imageUrlWithSize } from "../../utils/imageUrl";
import Carousel from "react-multi-carousel";
import { PersonCardTypes } from "../types/Person.type";
import PersonCard from "../cards/PersonCard";
import { noImage } from "../../utils/noImage";
import { carouselOptions } from "../slider/PersonSlide";

const Crew: React.FC<PropTypes> = ({ color, id, type }) => {
  const { data, loading, error } = useFetch(`${type}/credit/${id}/crew`);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <h1>No data</h1>;

  const crew: PersonCardTypes[] = selectedPeople(data).map(
    (el: any): PersonCardTypes => ({
      id: el.id,
      person_name: el.original_name,
      profile_img: el.profile_path
        ? imageUrlWithSize(el.profile_path, "185")
        : el.gender === 2
        ? noImage.male
        : noImage.female,
      department: el.job,
      color: color,
      gender: el.gender,
    })
  );

  return (
    <Carousel {...carouselOptions}>
      {crew.map((el: any) => (
        <PersonCard {...el} color={color} key={el.id} />
      ))}
    </Carousel>
  );
};
interface PropTypes {
  color: string;
  id: number;
  type: "tv" | "movie";
}
export default Crew;
