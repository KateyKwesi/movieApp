import React, { useState } from "react";
import IframeResizer from "@iframe-resizer/react";
import { useParams } from "react-router-dom";

function WatchTV() {
  const { id, season, episode } = useParams();
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-amber-50 z-10">
          <h1 className="inline-block text-slate-400 text-2xl tracking-widest  font-semibold  m-5 ">
            LOADING...
          </h1>
        </div>
      )}
      <IframeResizer
        className="relative z-50"
        log="collapsed"
        src={`https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=9146ff&autoPlay=true&nextEpisode=true&episodeSelector=true`}
        style={{ width: "100%", height: "100vh" }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default WatchTV;
