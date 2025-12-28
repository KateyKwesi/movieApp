import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Calendar,
  Star,
  Play,
  Info,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Avatar from "react-avatar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const MovieIdInfo = () => {
  const TOKEN = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  function formatTime(totalMinutes) {
    const totalSeconds = totalMinutes * 60;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  const fetchMovieBackdrop = async ({ queryKey }) => {
    const [, movieId] = queryKey;
    if (!movieId) throw new Error("Movie ID is missing");

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

  const fetchMovieInfo = async ({ queryKey }) => {
    const [, movieInfo] = queryKey;
    if (!movieInfo) throw new Error("Movie ID is missing");

    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieInfo}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
      }
    );
    return res.data;
  };

  const fetchMovieTrailer = async ({ queryKey }) => {
    const [, movieTrailer] = queryKey;
    if (!movieTrailer) throw new Error("Movie ID is missing");

    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieTrailer}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
      }
    );
    return res.data;
  };

  const {
    data: Moviebackdrops,
    isLoading: MoviebackdropsLoading,
    error: MoviebackdropsError,
  } = useQuery({
    queryKey: ["movieBackdrops", id],
    queryFn: fetchMovieBackdrop,
    enabled: !!id, // only run when id exists
  });

  const {
    data: MovieInfo,
    isLoading: MovieInfoLoading,
    error: MovieInfoError,
  } = useQuery({
    queryKey: ["movieInfo", id],
    queryFn: fetchMovieInfo,
    enabled: !!id, // only run when id exists
  });

  const {
    data: MovieTrailer,
    isLoading: MovieTrailerLoading,
    error: MovieTrailerError,
  } = useQuery({
    queryKey: ["movieTrailer", id],
    queryFn: fetchMovieTrailer,
    enabled: !!id, // only run when id exists
  });

  const Trailer = MovieTrailer?.results.find(
    (trailer) => trailer.name === "Official Trailer"
  );
  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      <div className="relative h-[80vh] md:h-[80vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${Moviebackdrops?.backdrops[3].file_path})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
        <div className=" w-full relative flex h-full items-end"></div>
      </div>
      <div className="flex flex-col justify-center items-center w-full mx-auto xl:flex-row  gap-5 px-8 xl:items-start">
        <div className="flex justify-center flex-col">
          <img
            src={`https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/w300/${Moviebackdrops?.posters[1].file_path}`}
            alt=""
          />
          <div className="text-white w-full flex-col ">
            <Button
              onClick={() => {
                navigate(`/watch/${id}`);
              }}
              className="w-full bg-amber-50 text-slate-950 mb-3 py-5 border-white/10 hover:bg-amber-50 hover:text-gray-800 hover:border"
            >
              <Play className="fill-white w-4" />
              Watch Now
            </Button>
            <Button
              onClick={() =>
                window.open(
                  `https://www.imdb.com/title/${MovieInfo?.imdb_id}`,
                  "_blank"
                )
              }
              className="w-full bg-blue-950/10 font-semibold py-5 border-amber-50/10 hover:text-black hover:bg-yellow-500"
              variant="outline"
            >
              <ExternalLink />
              View on IMBD
            </Button>
          </div>
          <div className="text-white w-full mt-4 bg-blue-950/10 border border-amber-50/10 rounded-md backdrop-blur-lg shadow-2xl">
            <div className="px-3 py-2">
              <p className="text-slate-400 font-semibold text-xl mb-2 border-b-amber-50/20 border-b">
                Basic Info
              </p>
              <div className="flex justify-between text-sm mt-4 text-slate-400">
                <span>Release</span>
                <span>{MovieInfo?.release_date}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-4 text-slate-400">
                <span>Rating</span>
                <div className="flex flex-col items-center inline">
                  <Rating value={MovieInfo?.vote_average / 2}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton
                        size={6}
                        className="text-yellow-500 text-7xl"
                        key={index}
                      />
                    ))}
                  </Rating>
                </div>
              </div>
              <div className="flex justify-between text-sm mt-4 text-slate-400">
                <span>Runtime</span>
                <span>{formatTime(`${MovieInfo?.runtime}`)}</span>
              </div>
              <div className="flex justify-between text-sm mt-4 text-slate-400">
                <span>Status</span>
                <span>{MovieInfo?.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" h-full md:ml-8  ">
            <div className="pt-2  ">
              <h1 className="text-slate-300 font-semibold text-xl max-w-[30ch] mb-4 md:text-3xl md:font-black  ">
                {MovieInfo?.original_title}
              </h1>
            </div>
            <div className="text-slate-400 flex gap-1  flex-wrap text-sm  ">
              <span className=" bg-white text-black font-semibold border border-amber-50/10 rounded-md px-2 h-7 py-1 backdrop-blur-lg shadow-2xl">
                Movie
              </span>
              <span className="flex justify-center items-center gap-0.5  bg-blue-950/10 border h-7 border-amber-50/10 rounded-md px-2 py-1 backdrop-blur-lg shadow-2xl">
                <Star color="#ffdd00" className="fill-amber-300 w-4" />
                {MovieInfo?.vote_average.toFixed(1)}
              </span>
              <span className="flex gap-2 flex-wrap">
                {MovieInfo?.genres.map((genre, index) => (
                  <span
                    key={index}
                    className=" bg-blue-950/10 border border-amber-50/10 rounded-md h-7 px-2 py-1 backdrop-blur-lg shadow-2xl"
                  >
                    {genre.name}
                  </span>
                ))}
              </span>
            </div>
            <div>
              <div className="mt-5">
                <h1 className="text-slate-400 font-semibold text-xl mb-2 border-b-amber-50/20 border-b">
                  Overview
                </h1>
                <div className="h-[200px] overflow-auto  bg-white/5  backdrop-blur-md rounded-xl border-white/5   transition-all duration-300 hover:border-blue-950 hover:border">
                  <p className="text-slate-400 p-4  max-w-[80ch] leading-relaxed">
                    {MovieInfo?.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {Trailer && (
          <div className="ml-5 mb-10 xl:px-6   self-center  w-full xl:min-w-150 xl:max-w-150  xl:self-start  ">
            <iframe
              className="w-full sm:h-100  "
              src={`https://www.youtube.com/embed/${Trailer?.key}?autoplay=1&controls=0&mute=`}
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
