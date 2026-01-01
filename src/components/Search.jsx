import { useState, useEffect } from "react";
import { MovieSearch } from "./MOVIE/movieSearch";
import { TvSearch } from "./TV/tvSearch";
import { SearchIcon } from "lucide-react";

// Source - https://stackoverflow.com/a
// Posted by HenryDev
// Retrieved 2026-01-01, License - CC BY-SA 4.0

function useDebounce(val, delay) {
  const [debounceValue, setDebounceValue] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);
  return debounceValue;
}

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const DebounceSearch = useDebounce(searchTerm, 500);
  return (
    <div>
      <div>
        <div className="pt-50 flex justify-center pb-10 mx-auto w-[80vw]">
          <div
            className="
      relative flex items-center
      w-full max-w-2xl h-14
      bg-slate-900/70
      backdrop-blur-xl
      rounded-2xl
      px-4
      shadow-[0_10px_30px_rgba(0,0,0,0.4)]
      ring-1 ring-white/10
      transition-all duration-300
      focus-within:bg-slate-900
      focus-within:ring-amber-400/40
    "
          >
            <SearchIcon className="absolute left-4 w-5 text-white/50" />

            <input
              type="text"
              placeholder="Search movies or TV shows"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
        w-full
        bg-transparent
        pl-10 pr-3
        text-white
        placeholder:text-white/40
        outline-none
      "
            />
          </div>
        </div>
      </div>
      ;
      <div className="flex  flex-col ">
        <MovieSearch search={DebounceSearch} />
        <TvSearch search={DebounceSearch} />
      </div>
    </div>
  );
};
