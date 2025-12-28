import { GenreCarousel } from "./GenreCard";
import { MovieThriller } from "../../fetchMovies";

export const Thriller = () => (
  <GenreCarousel
    title="Thriller"
    queryKey={["movies-thriller"]}
    queryFn={MovieThriller}
  />
);
