import { GenreCarousel } from "./GenreCard";
import { MovieDocumentary } from "../../fetchMovies";

export const Documentary = () => (
  <GenreCarousel
    title="documentary"
    queryKey={["movies-documentary"]}
    queryFn={MovieDocumentary}
  />
);
