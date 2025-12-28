import { GenreCarousel } from "./GenreCard";
import { MovieRomance } from "../../fetchMovies";

export const Romance = () => (
  <GenreCarousel
    title="romance"
    queryKey={["movies-romance"]}
    queryFn={MovieRomance}
  />
);
