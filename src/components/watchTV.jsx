import React from "react";
import IframeResizer from "@iframe-resizer/react";
import { useParams } from "react-router-dom";

function WatchTV() {
  const { id, season, episode } = useParams();

  return (
    <IframeResizer
      className="relative z-50"
      log="collapsed"
      src={`https://fmovies4u.com/embed/tmdb-tv-${id}/${season}/${episode}?autoPlay=true`}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}

export default WatchTV;
