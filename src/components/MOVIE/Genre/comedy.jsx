import { GenreCarousel } from "./GenreCard";
import { MovieComedy } from "../../fetchMovies";

export const Comedy = () => (
  <GenreCarousel
    title="comedy"
    queryKey={["movies-comedy"]}
    queryFn={MovieComedy}
  />
);
