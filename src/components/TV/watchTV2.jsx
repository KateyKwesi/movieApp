import React, { useState } from "react";
import IframeResizer from "@iframe-resizer/react";
import { useParams } from "react-router-dom";

function WatchTV2() {
  const { id, season, episode } = useParams();
  const [loading, setLoading] = useState(true);

  return (
    <div className="fixed z-60 episode-scroll inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex justify-center items-center ">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-amber-50 z-10">
          <h1 className="inline-block text-slate-400 text-2xl tracking-widest  font-semibold  m-5 ">
            LOADING...
          </h1>
        </div>
      )}
      <div className="w-full player-wrap h-[40vh] min-h-[40vh] landscape:h-[100svh] landscape:min-h-[100svh]">
        <iframe
          className="w-full h-full"
          src={`https://www.vidking.net/embed/tv/${id}/${season}/${episode}?autoPlay=true&nextEpisode=true&episodeSelector=true`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}

export default WatchTV2;
