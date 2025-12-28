import { GenreCarousel } from "./GenreCard";
import { MovieMystery } from "../../fetchMovies";

export const Mystery = () => (
  <GenreCarousel
    title="Mystery"
    queryKey={["movies-mystery"]}
    queryFn={MovieMystery}
  />
);
