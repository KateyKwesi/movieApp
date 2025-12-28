import { GenreCarousel } from "./GenreCard";
import { MovieCrime } from "../../fetchMovies";

export const Crime = () => (
  <GenreCarousel
    title="crime"
    queryKey={["movies-crime"]}
    queryFn={MovieCrime}
  />
);
