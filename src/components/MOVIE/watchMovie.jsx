import React, { useState } from "react";
import IframeResizer from "@iframe-resizer/react";
import { useParams } from "react-router-dom";

function WatchMovie() {
  const { id } = useParams();
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
        src={`https://fmovies4u.com/embed/tmdb-movie-${id}`}
        style={{ width: "100%", height: "100vh" }}
        log={false}
        checkOrigin={false}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default WatchMovie;
