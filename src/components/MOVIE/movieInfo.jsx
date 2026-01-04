import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Calendar,
  Star,
  Play,
  Info,
  Bookmark,
  ExternalLink,
  Download,
  Youtube,
  X,
} from "lucide-react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Avatar from "react-avatar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import YouTube from "react-youtube";
import { useState } from "react";
import { MovieCardUpdated } from "./MovieCardUpdated";

export const MovieIdInfo = () => {
  const TOKEN = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();
  const location = useLocation();
  const { id: paramId } = useParams();

  const id = paramId ?? location.state?.id;

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

  const fetchMovieSimilar = async ({ queryKey }) => {
    const [, movieSimilar] = queryKey;
    if (!movieSimilar) throw new Error("Movie ID is missing");

    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
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
    data: Moviesimilar,
    isLoading: MoviesimilarLoading,
    error: MoviesimilarError,
  } = useQuery({
    queryKey: ["movieSimilar", id],
    queryFn: fetchMovieSimilar,
    enabled: !!id, // only run when id exists
  });

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

  const [download, setDownload] = useState(false);
  const Trailer = MovieTrailer?.results.find(
    (trailer) => trailer.name === "Official Trailer"
  );
  const [playtrailer, setPlayTrailer] = useState(false);
  const closeDownload = () => {
    setDownload(false);
  };
  return (
    <div className="min-h-screen  overflow-hidden">
      <div className="relative h-[80vh] md:h-[80vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${Moviebackdrops?.backdrops[3]?.file_path})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
        <div className=" w-full relative flex h-full items-end"></div>
      </div>
      <div className="flex flex-col justify-center items-center  mx-auto xl:flex-row  gap-5 px-8 xl:items-start">
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
              className="w-full bg-[#e84661]  hover:bg-[#e84661]  mb-4 py-5 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 text-slate-100 hover:shadow-2xl"
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
          <div className="w-full text-xs mt-4 bg-slate-900/20 border border-slate-800/30 rounded-lg backdrop-blur-lg shadow-xl">
            <div className="px-6 py-5">
              <h1 className="text-slate-300 text-xl mb-4 font-semibold border-b-2 border-[#e84661] pb-2">
                Info
              </h1>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">Release </span>
                  <span>{MovieInfo?.release_date}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">Runtime</span>
                  <span>{formatTime(`${MovieInfo?.runtime}`)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">Status</span>
                  <span>{MovieInfo?.status}</span>
                </div>
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
            <div className="  gap-1 w-full  flex flex-wrap text-yellow-500 text-sm ">
              <span className="   border border-amber-50/10 rounded-md px-2 h-7 py-1 backdrop-blur-lg shadow-2xl">
                MOVIE
              </span>
              <span className="flex justify-center items-center gap-0.5  bg-blue-950/10 border h-7 border-amber-50/10 rounded-md px-2 py-1 backdrop-blur-lg shadow-2xl">
                <Star color="#ffdd00" className="fill-amber-300 w-4" />
                {MovieInfo?.vote_average.toFixed(1)}
              </span>
              <span className="flex gap-2 flex-wrap">
                {MovieInfo?.genres.map((genre, index) => (
                  <span
                    key={index}
                    className=" bg-[#2e0e13]/10 text-[#e0435e] border  border-amber-50/10 rounded-md h-7 px-2 py-1 backdrop-blur-lg shadow-2xl"
                  >
                    {genre.name}
                  </span>
                ))}
              </span>
            </div>
            <div className="w-[80vw] xl:w-full">
              <div className="mt-5">
                <h1 className="text-slate-400 font-semibold text-xl mb-2 border-b-amber-50/20 border-b">
                  Overview
                </h1>
                <div className="h-fit overflow-auto  bg-white/5  backdrop-blur-md rounded-xl border-white/5   transition-all duration-300 hover:border-blue-950 hover:border">
                  <p className="text-slate-400 p-4 text-xs sm:text-[1rem] max-w-[80ch] leading-relaxed">
                    {MovieInfo?.overview}
                  </p>
                </div>
              </div>
              <div className=" mt-5  flex flex-col sm:flex-row sm:gap-3 justify-center gap-2">
                <div>
                  <Button
                    onClick={() => setDownload(true)}
                    className="w-full bg-[#e84661]  hover:bg-[#e84661]  mb-4 py-5 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 text-slate-100 hover:shadow-2xl"
                  >
                    <Download className=" w-6 h-6 " />
                    <span className="font-medium">DOWNLOAD</span>
                  </Button>
                </div>
                {download && (
                  <div className="fixed episode-scroll inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex justify-center items-center ">
                    <div className="relative w-full h-full max-w-4xl max-h-96">
                      <iframe
                        src={`https://dl.vidsrc.vip/movie/${id}`}
                        className="w-full relative z-80 h-full episode-scroll rounded-lg"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                      <button
                        onClick={closeDownload}
                        className="absolute top-2 z-80 right-2 text-white bg-gray-900 bg-opacity-70 p-2 rounded-full hover:bg-gray-800"
                      >
                        <X color="#ffffff" />
                      </button>
                    </div>
                  </div>
                )}
                <div>
                  <Button
                    onClick={() => setPlayTrailer(true)}
                    className="w-full border border-[#e84661] bg-transparent hover:bg-transparent  mb-4 py-5 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 text-slate-100 hover:shadow-2xl"
                  >
                    <Youtube className=" w-6 h-6 " />
                    <span className="font-medium">TRAILER</span>
                  </Button>
                </div>
              </div>
              <div
                className={`${
                  download === false ? `opacity-100` : `opacity-0`
                }`}
              >
                <MovieCardUpdated
                  name={`Similar`}
                  queryFn={fetchMovieSimilar}
                  queryKey={[`movieSimilar`, id]}
                />
              </div>
            </div>
          </div>
        </div>

        {playtrailer && (
          <div className="fixed episode-scroll inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex justify-center items-center ">
            <div className="relative w-[80vw] h-[40vh] ">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${Trailer?.key}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              ></iframe>

              <button
                onClick={() => setPlayTrailer(false)}
                className="absolute top-2 z-80 right-2 text-white bg-gray-900 bg-opacity-70 p-2 rounded-full hover:bg-gray-800"
              >
                <X color="#ffffff" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
