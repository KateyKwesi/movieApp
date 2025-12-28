import { GenreCarousel } from "./GenreCard";
import { MovieFamily } from "../../fetchMovies";

export const Family = () => (
  <GenreCarousel
    title="family"
    queryKey={["movies-family"]}
    queryFn={MovieFamily}
  />
);
