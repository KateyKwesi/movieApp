import { GenreCarousel } from "./GenreCard";
import { MovieScienceFiction } from "../../fetchMovies";

export const ScienceFiction = () => (
  <GenreCarousel
    title="Science Fiction"
    queryKey={["movies-scifi"]}
    queryFn={MovieScienceFiction}
  />
);
