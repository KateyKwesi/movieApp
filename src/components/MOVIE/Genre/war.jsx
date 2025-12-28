import { GenreCarousel } from "./GenreCard";
import { MovieWar } from "../../fetchMovies";

export const War = () => (
  <GenreCarousel title="war" queryKey={["movies-war"]} queryFn={MovieWar} />
);
