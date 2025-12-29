import { fetchTv } from "./fetchMovies";
import Footer from "./Footer";
import { Hero } from "./Hero";
import { MovieCard } from "./MOVIE/movieCard";
import { TrendingCard } from "./trendingCard";
import { TVCard } from "./TV/tvCard";

export default function Home() {
  return (
    <div className="relative ">
      <Hero />
      <TrendingCard />
      <MovieCard name={`MOVIES`} />
      <TVCard title="tv shows" queryFn={fetchTv} queryKey={[`tv discover`]} />
      <Footer />
    </div>
  );
}
