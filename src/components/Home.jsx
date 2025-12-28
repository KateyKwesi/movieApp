import { Hero } from "./Hero";
import { MovieCard } from "./MOVIE/movieCard";
import { TrendingCard } from "./trendingCard";
import { TVCard } from "./TV/tvCard";
export default function Home() {
  return (
    <div className="relative bg-slate-950">
      <Hero />
      <TrendingCard />
      <MovieCard name={`MOVIES`} />
      <TVCard />
    </div>
  );
}
