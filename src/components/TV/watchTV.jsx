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
        src={`https://player.vidplus.to/embed/tv/${id}/${season}/${episode}?autoplay=true&autonext=true&nextbutton=true&poster=true&title=true&download=true&watchparty=false&chromecast=true&episodelist=true&servericon=true&setting=true&pip=true&primarycolor=6C63FF&secondarycolor=9F9BFF&iconcolor=FFFFFF&font=Roboto&fontcolor=FFFFFF&fontsize=20&opacity=0.5`}
        style={{ width: "100%", height: "100vh" }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default WatchTV;
