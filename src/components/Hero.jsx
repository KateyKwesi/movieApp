import { useState, useEffect } from "react";
import { MovieIdInfo } from "./MOVIE/movieInfo";
import { Star, Calendar, Play, Info } from "lucide-react";
import { genreData } from "./genre";
import { useQuery } from "@tanstack/react-query";
import { popular } from "./fetchMovies";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Hero() {
  const TOKEN = import.meta.env.VITE_TMDB_API_KEY;
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const fetchTitle = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
      }
    );
    return res.data;
  };
  const { data: popularMovie, isLoading: popularLoading } = useQuery({
    queryKey: ["moviespopular", count],
    queryFn: popular,
  });
  const {
    data: MovieTitle,
    isLoading: TitleLoading,
    error: TitleError,
  } = useQuery({
    queryKey: ["movies-title", count],
    queryFn: fetchTitle,
    enabled: !!popularMovie,
  });

  const movieId = popularMovie?.results?.[count]?.id;
  const getEnglishtitle = MovieTitle?.logos.find(
    (movie) => movie.iso_639_1 === "en"
  );
  const titleLogo = `https://image.tmdb.org/t/p/original${getEnglishtitle?.file_path}`;

  const handleGenre = () => {
    const ids = popularMovie?.results?.[count]?.genre_ids.slice(0, 2);

    if (!ids) return null;
    return genreData.genres
      .filter((genre) => ids.includes(genre.id))
      .map((genre, index) => (
        <div
          key={index}
          className="bg-white/10 border border-white/30 px-2 rounded-full
                   transition-all duration-300 ease-in-out hover:bg-white/30
                   shadow-lg text-white flex gap-1.5 items-center"
        >
          <span className="text-xs">{genre.name}</span>
        </div>
      ));
  };

  const handleClicked = () => {
    navigate(`/watch/${movieId}`);
  };
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!popularMovie?.results) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCount((prev) =>
          prev + 1 < popularMovie.results.length ? prev + 1 : 0
        );
        setFade(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [popularMovie]);

  return (
    <div className="min-h-screen bg-slate-pattern">
      <div className="relative h-[90vh] md:h-[90vh] w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularMovie?.results[count]?.backdrop_path})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
        <div className=" w-full relative flex h-full items-end">
          <div className="flex flex-col text-white  gap-8 px-5 md:px-8">
            <div className="">
              <img
                className="max-w-80 w-30 px-2 sm:w-50"
                src={titleLogo}
                alt={`${popularMovie?.results[count]?.title}`}
              />
            </div>
            <div className="mb-1 flex gap-3 flex-wrap">
              <div className=" bg-white/10 border border-white/30 px-2  rounded-full transition-all duration-300 ease-in-out hover:bg-white/30 shadow-lg text-white flex gap-1.5 items-center">
                <Star color="#ffdd00" className="fill-amber-300 w-3" />
                <span className="text-xs">
                  {popularMovie?.results[count].vote_average.toFixed(1)}/10
                </span>
              </div>
              <div className=" bg-white/10 border border-white/30 px-2  rounded-full transition-all duration-300 ease-in-out hover:bg-white/30 shadow-lg text-white flex gap-1.5 items-center">
                <Calendar className="w-3" />
                <span className="text-xs">
                  {popularMovie?.results[count].release_date}
                </span>
              </div>
              {handleGenre()}
            </div>
            <div className="">
              <p className="text-xs sm:text:md md:text-lg font-light lg:text:xl px-1 max-w-[60ch] overflow-hidden leading-relaxed">
                {popularMovie?.results[count].overview}
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <button
                  onClick={() => {
                    handleClicked();
                  }}
                  className="bg-white/10 border border-white/20 px-7 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 shadow-lg text-white flex gap-1 items-center"
                >
                  <span>
                    <Play className="fill-white w-4" />
                  </span>
                  <span className=" font-body">PLAY</span>
                </button>
              </div>
              <div>
                <Link
                  to={`/movieInfo/${popularMovie?.results[count].id}`}
                  state={{ id: popularMovie?.results[count].id }}
                >
                  <button
                    onClick={() => {
                      <MovieIdInfo
                        id={popularMovie?.results[count].overview}
                      />;
                    }}
                    className="bg-white/10  px-7 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-white/30 shadow-lg text-white flex gap-1 items-center"
                  >
                    <span>
                      <Info className="w-4" />
                    </span>
                    <span className="text-xs font-medium">INFO</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
