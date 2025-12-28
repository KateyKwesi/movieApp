import { Action } from "./Genre/movieAction";
import { Adventure } from "./Genre/movieAdventure";
import { Animation } from "./Genre/movieAnimation";
import { Comedy } from "./Genre/comedy";
import { Crime } from "./Genre/crime";
import { Documentary } from "./Genre/documentary";
import { Drama } from "./Genre/drama";
import { Family } from "./Genre/family";
import { Fantasy } from "./Genre/fantasy";
import { History } from "./Genre/history";
import { Horror } from "./Genre/horror";
import { Music } from "./Genre/music";
import { Mystery } from "./Genre/mystery";
import { Romance } from "./Genre/romance";
import { Thriller } from "./Genre/triller";
import { ScienceFiction } from "./Genre/Tv-film";
import { War } from "./Genre/war";
import { Western } from "./Genre/western";

import { MovieCard } from "./movieCard";
import { NowPlaying } from "./movieNowPlaying";
import { Popularmovies } from "./moviePopular";
import { TopRatedmovies } from "./MovieTopRated";
import { Upcomingmovies } from "./MovieUpcoming";

function MovieSction() {
  return (
    <div className="pt-20">
      <TopRatedmovies />
      <MovieCard name="Discover" />
      <NowPlaying />
      <Popularmovies />
      <Upcomingmovies />

      {/* Genres */}
      <Action />
      <Adventure />
      <Animation />
      <Comedy />
      <Crime />
      <Documentary />
      <Drama />
      <Family />
      <Fantasy />
      <History />
      <Horror />
      <Music />
      <Mystery />
      <Romance />
      <ScienceFiction />
      <Thriller />
      <War />
      <Western />
    </div>
  );
}

export default MovieSction;
