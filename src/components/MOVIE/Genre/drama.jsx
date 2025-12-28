import { GenreCarousel } from "./GenreCard";
import { MovieDrama } from "../../fetchMovies";

export const Drama = () => (
  <GenreCarousel
    title="Drama"
    queryKey={["movies-drama"]}
    queryFn={MovieDrama}
  />
);
