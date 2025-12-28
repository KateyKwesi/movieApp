import React from "react";
import {
  airingTv,
  onairTv,
  popularTv,
  TopTv,
  TrendingTv,
  TvActionAdventure,
  TvAnimation,
  TvComedy,
  TvCrime,
  TvDocumentary,
  TvDrama,
  TvFamily,
  TvKids,
  TvMystery,
  TvNews,
  TvReality,
  TvSciFiFantasy,
  TvSoap,
  TvTalk,
  TvWarPolitics,
  TvWestern,
} from "../fetchMovies";
import { TVCard } from "./tvCard";

function TvSection() {
  return (
    <div className="text-white pt-20">
      <TVCard title="top rated" queryFn={TopTv} queryKey={[`topratedshows`]} />
      <TVCard
        title="trending "
        queryFn={TrendingTv}
        queryKey={[`tv trending`]}
      />
      <TVCard title="popular" queryFn={popularTv} queryKey={[`tv popular`]} />
      <TVCard title="aring today" queryFn={airingTv} queryKey={[`tv airing`]} />
      <TVCard title="on the air" queryFn={onairTv} queryKey={[`tv on air`]} />
      <TVCard
        title="action & adventure"
        queryFn={TvActionAdventure}
        queryKey={[`action and adventure`]}
      />
      <TVCard
        title="animation"
        queryFn={TvAnimation}
        queryKey={[`tvanimation`]}
      />
      <TVCard title="comedy" queryFn={TvComedy} queryKey={[`tvcomedy`]} />
      <TVCard title="crime" queryFn={TvCrime} queryKey={[`tvcrime`]} />
      <TVCard
        title="documentary"
        queryFn={TvDocumentary}
        queryKey={[`tvdocumentary`]}
      />
      <TVCard title="drama" queryFn={TvDrama} queryKey={[`tvdrama`]} />
      <TVCard title="family" queryFn={TvFamily} queryKey={[`tvfamily`]} />
      <TVCard title="kids" queryFn={TvKids} queryKey={[`tvkids`]} />
      <TVCard title="mystery" queryFn={TvMystery} queryKey={[`tvmystery`]} />
      <TVCard title="news" queryFn={TvNews} queryKey={[`tvnews`]} />
      <TVCard title="reality" queryFn={TvReality} queryKey={[`tvreality`]} />
      <TVCard
        title="scifi fantasy"
        queryFn={TvSciFiFantasy}
        queryKey={[`tvscififantasy`]}
      />
      <TVCard title="soap" queryFn={TvSoap} queryKey={[`tvsoap`]} />
      <TVCard title="talk" queryFn={TvTalk} queryKey={[`tvtalk`]} />
      <TVCard
        title="war politics"
        queryFn={TvWarPolitics}
        queryKey={[`tvwarpolitics`]}
      />
      <TVCard title="western" queryFn={TvWestern} queryKey={[`tvwestern`]} />
    </div>
  );
}

export default TvSection;
