import { MovieAction } from "../../fetchMovies";
import { GenreCarousel } from "./GenreCard";

export const Action = () => {
  return (
    <GenreCarousel
      title="Action"
      queryKey={["movies-action"]}
      queryFn={MovieAction}
    />
  );
};
