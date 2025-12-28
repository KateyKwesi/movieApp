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
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Avatar from "react-avatar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { genreData } from "../genre";

export const TVIdInfo = () => {
  const TOKEN = import.meta.env.VITE_TMDB_API_KEY;
  const [seasonColor, setSeasonColor] = useState(1);
  const [viewTrailer, setViewTrailere] = useState(false);

  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const location = useLocation();

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
      `https://api.themoviedb.org/3/tv/${movieId}/images`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
      }
    );
    return res.data;
  };

  const fetchTvInfo = async ({ queryKey }) => {
    const [, movieInfo] = queryKey;
    if (!movieInfo) throw new Error("Movie ID is missing");

    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${movieInfo}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
      }
    );
    return res.data;
  };

  const fetchTVTrailer = async ({ queryKey }) => {
    const [, TVTrailer] = queryKey;
    if (!TVTrailer) throw new Error("Movie ID is missing");

    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${TVInfo.id}/season/${seasonColor}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
      }
    );
    return res.data;
  };

  const fetchTvEpisodeInfo = async ({ queryKey }) => {
    const [, Tvepisode] = queryKey;
    if (!Tvepisode) throw new Error("Movie ID is missing");

    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${TVInfo?.id}/season/${seasonColor}?language=en-US`,
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
    enabled: !!id,
  });

  const {
    data: TVInfo,
    isLoading: MovieInfoLoading,
    error: MovieInfoError,
  } = useQuery({
    queryKey: ["tvInfo", id],
    queryFn: fetchTvInfo,
    enabled: !!id,
  });

  const {
    data: TVEpisodeInfo,
    isLoading: TVEpisodeInfoLoading,
    error: TVEpisodeInfoError,
  } = useQuery({
    queryKey: ["tvEpisodeInfo", seasonColor],
    queryFn: fetchTvEpisodeInfo,
    enabled: !!TVInfo,
  });

  const {
    data: TVTrailer,
    isLoading: TVTrailerLoading,
    error: TVTrailerError,
  } = useQuery({
    queryKey: ["TVTrailer", TVInfo?.id],
    queryFn: fetchTVTrailer,
    enabled: !!TVInfo,
  });
  const handleLoading = () => {
    if (TVTrailerLoading || MovieInfoLoading || MoviebackdropsLoading) {
      return (
        <DotLottieReact
          src="https://lottie.host/e46b32c4-9a01-4db9-8d08-dd7aee566294/0UL52NAswZ.lottie"
          loop
          autoplay
        />
      );
    }
  };
  const Seasons = () => {
    return TVInfo?.seasons?.map((season, index) => {
      return (
        <Button
          key={index}
          onClick={() => {
            setSeasonColor(season.season_number);
          }}
          variant={seasonColor === season.season_number ? `outline` : null}
          className={`flex flex-col w-fit h-15 hover:cursor-pointer hover:bg-white hover:text-black ${
            season.season_number === seasonColor
              ? `bg-amber-50  text-black font-bold `
              : `bg-white/5 text-slate-400`
          }  `}
        >
          <span className="">{season.name}</span>
          <span className="text-xs italic">
            Total episodes {season.episode_count}
          </span>
        </Button>
      );
    });
  };

  const handleGenre = () => {
    const ids = TVInfo?.genres.map((id) => id.id);

    if (!ids) return null;
    return genreData.genres
      .filter((genre) => ids.includes(genre.id))
      .map((genre, index) => (
        <span
          key={index}
          className=" bg-blue-950/10 border  border-amber-50/10 rounded-md h-7 px-2 py-1 backdrop-blur-lg shadow-2xl"
        >
          {genre.name}
        </span>
      ));
  };

  return (
    <div className="min-h-screen bg-slate-950 ">
      <div className="relative h-[80vh] md:h-[80vh] w-full ">
        {handleLoading()}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${Moviebackdrops?.backdrops[3]?.file_path})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
        <div className=" w-full relative  flex h-full items-end"></div>
      </div>
      <div
        className={`flex flex-col justify-center items-center mx-auto gap-5 px-8 
  xl:flex-row xl:items-start
  ${viewTrailer ? "xl:w-full" : "xl:w-7xl"}
`}
      >
        <div
          className={`${
            TVTrailer?.results.length <= 0
              ? `xl:min-w-65 xl:sticky xl:top-0`
              : `min-w-55`
          } flex justify-center flex-col  `}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300/${Moviebackdrops?.posters[1]?.file_path}`}
            alt=""
          />
          <div className={`text-white w-full  flex-col `}>
            <Button
              onClick={() => {
                if (window.innerWidth <= 768) {
                  document
                    .getElementById("play")
                    .scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate(`/watch/${TVInfo.id}/1/1`);
                }
              }}
              className="w-full bg-amber-50 text-slate-950 mb-3 py-5 border-white/10 hover:bg-amber-50 hover:text-gray-800 hover:border"
            >
              <Play className="fill-white w-4" />
              Watch Now
            </Button>
            <Button
              onClick={() => {
                setViewTrailere((prev) => !prev);

                if (window.innerWidth <= 768) {
                  setTimeout(() => {
                    document
                      .getElementById("trailer")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  navigate(`/watch/${TVInfo.id}/1/1`);
                }
              }}
              className="w-full bg-blue-950/10 font-semibold py-5 border-amber-50/10 hover:text-black hover:bg-yellow-500"
              variant="outline"
            >
              <ExternalLink />
              View Trailer
            </Button>
          </div>
          <div className="text-white w-full mt-4 bg-blue-950/10 border border-amber-50/10 rounded-md backdrop-blur-lg shadow-2xl">
            <div className="px-3 py-2">
              <p className="text-slate-400 font-semibold text-xl mb-2 border-b-amber-50/20 border-b">
                Basic Info
              </p>
              <div className="flex justify-between text-sm mt-4 text-slate-400">
                <span>First-Air-Date</span>
                <span>{TVInfo?.first_air_date}</span>
              </div>
              <div className="flex justify-between text-sm mt-4 text-slate-400">
                <span>Last-Air-Date</span>
                <span>{TVInfo?.last_air_date}</span>
              </div>
              <div className="flex justify-between text-sm mt-4 text-slate-400">
                <span> Episodes</span>
                <span>{TVInfo?.number_of_episodes}</span>
              </div>
              <div className="flex justify-between text-sm mt-4 text-slate-400">
                <span>Seasons</span>
                <span>{TVInfo?.number_of_seasons}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-4 text-slate-400">
                <span>Rating</span>
                <div className="flex flex-col items-center ">
                  <Rating value={TVInfo?.vote_average / 2}>
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
                <span>Status</span>
                <span>{TVInfo?.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" h-full md:ml-8 ">
            <div className="pt-2  ">
              <h1 className="text-slate-300 font-semibold text-xl max-w-[30ch] mb-4 md:text-3xl md:font-black  ">
                {TVInfo?.original_name}
              </h1>
            </div>
            <div className="text-slate-400 flex gap-1 w-full flex flex-wrap text-sm ">
              <span className=" bg-white text-black font-semibold border border-amber-50/10 rounded-md px-2 h-7 py-1 backdrop-blur-lg shadow-2xl">
                TV SHOW
              </span>
              <span className="flex justify-center items-center gap-0.5  bg-blue-950/10 border h-7 border-amber-50/10 rounded-md px-2 py-1 backdrop-blur-lg shadow-2xl">
                <Star color="#ffdd00" className="fill-amber-300 w-4" />
                {TVInfo?.vote_average.toFixed(1)}
              </span>
              <span className="flex flex-wrap gap-2">{handleGenre()}</span>
            </div>
            <div>
              <div className="mt-5 ">
                <h1 className="text-slate-400 font-semibold text-xl mb-2 border-b-amber-50/20 border-b">
                  Overview
                </h1>
                <div className="h-[200px] overflow-auto bg-white/5  backdrop-blur-md rounded-xl border-white/5   transition-all duration-300 hover:border-blue-950 hover:border">
                  <p className="text-slate-400 p-4  max-w-[80ch] leading-relaxed">
                    {TVInfo?.overview}
                  </p>
                </div>
              </div>
              <div className="my-5   backdrop-blur-md">
                <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                  {Seasons()}
                </div>
              </div>
              <div>
                <div className="flex w-full flex-wrap gap-2 justify-center sm:justify-start">
                  {TVEpisodeInfo?.episodes.map((detail, index) => {
                    return (
                      <div
                        id="play"
                        onClick={() =>
                          navigate(
                            `/watch/${TVInfo.id}/${detail.season_number}/${detail.episode_number}`
                          )
                        }
                        key={index}
                        className="relative text-amber-50 w-50 overflow-hidden hover:cursor-pointer"
                      >
                        <div className="relative hover:cursor-pointer">
                          <img
                            src={
                              detail.still_path
                                ? `https://image.tmdb.org/t/p/w200/${detail.still_path}`
                                : `https://image.tmdb.org/t/p/original/${Moviebackdrops?.posters[3].file_path}`
                            }
                            alt=""
                          />
                          <div className="absolute bottom-0 backdrop-blur-lg bg-blue-950/10 font-semibold ">
                            <span>{formatTime(detail.runtime)}</span>
                          </div>
                        </div>
                        <div className="absolute w-full bg-slate-950/20   top-0 h-full"></div>

                        <div className="absolute top-0 right-0 backdrop-blur-xl shadow-2xl bg-red-950">
                          <span className="px-1 font-bold">{`S${detail.season_number}E${detail.episode_number}`}</span>
                        </div>
                        <div className="mb-3 text-slate-400 ">
                          <span className=" line-clamp-2 italic">
                            {detail.overview}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {TVTrailer?.results.length >= 1 && viewTrailer && (
          <div
            id="trailer"
            className="ml-5 mb-10 xl:px-6   self-center  w-full xl:min-w-150 xl:max-w-150  xl:self-start  "
          >
            <iframe
              className="w-full sm:h-100  "
              src={`https://www.youtube.com/embed/${TVTrailer?.results[0]?.key}?autoplay=1&controls=0&mute=`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
