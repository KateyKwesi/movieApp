import { GenreCarousel } from "./GenreCard";
import { MovieHorror } from "../../fetchMovies";

export const Horror = () => (
  <GenreCarousel
    title="Horror"
    queryKey={["movies-horror"]}
    queryFn={MovieHorror}
  />
);
