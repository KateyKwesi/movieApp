import { Hero } from "./Hero";
import { MovieCard } from "./movieCard";
import { TrendingCard } from "./trendingCard";
import { TVCard } from "./tvCard";
export default function Home() {
  return (
    <div>
      <Hero />
      <TrendingCard />
      <MovieCard />
      <TVCard />
    </div>
  );
}
