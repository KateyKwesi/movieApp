import { GenreCarousel } from "./GenreCard";
import { MovieAdventure } from "../../fetchMovies";

export const Adventure = () => (
  <GenreCarousel
    title="Adventure"
    queryKey={["movies-adventure"]}
    queryFn={MovieAdventure}
  />
);
