import { GenreCarousel } from "./GenreCard";
import { MovieFantasy } from "../../fetchMovies";

export const Fantasy = () => (
  <GenreCarousel
    title="Fantasy"
    queryKey={["movies-fantasy"]}
    queryFn={MovieFantasy}
  />
);
