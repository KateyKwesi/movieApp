import { GenreCarousel } from "./GenreCard";
import { MovieWestern } from "../../fetchMovies";

export const Western = () => (
  <GenreCarousel
    title="Western"
    queryKey={["movies-western"]}
    queryFn={MovieWestern}
  />
);
