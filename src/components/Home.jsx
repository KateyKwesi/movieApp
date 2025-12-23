import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "./fetchMovies";
import { Hero } from "./Hero";
import { MovieCard } from "./movieCard";
export default function Home() {
  const {
    data: MoviesDisover,
    isLoading: DiscoverLoading,
    error: DiscoverError,
  } = useQuery({
    queryKey: ["moviesDiscover"],
    queryFn: fetchMovies,
  });
  return (
    <div>
      <Hero />
      <MovieCard discover={MoviesDisover} />
    </div>
  );
}
