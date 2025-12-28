import { GenreCarousel } from "./GenreCard";
import { MovieHistory } from "../../fetchMovies";

export const History = () => (
  <GenreCarousel
    title="History"
    queryKey={["movies-history"]}
    queryFn={MovieHistory}
  />
);
