import { GenreCarousel } from "./GenreCard";
import { MovieAnimation } from "../../fetchMovies";

export const Animation = () => (
  <GenreCarousel
    title="Animation"
    queryKey={["movies-animation"]}
    queryFn={MovieAnimation}
  />
);
