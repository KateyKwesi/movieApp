import { GenreCarousel } from "./GenreCard";
import { MovieMusic } from "../../fetchMovies";

export const Music = () => (
  <GenreCarousel
    title="Music"
    queryKey={["movies-music"]}
    queryFn={MovieMusic}
  />
);
