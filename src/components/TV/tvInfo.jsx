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
  Zap,
  Share,
  Forward,
} from "lucide-react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Avatar from "react-avatar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { genreData } from "../genre";
import YouTube from "react-youtube";

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
      return null;
    }
  };

  const [download, setDownload] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleTrailer = () => {
    return TVTrailer?.results[0]?.key;
  };

  const handleDownloadClick = (episode) => {
    setDownload(true);
    setSelectedEpisode(episode);
  };

  const closeDownload = () => {
    setDownload(false);
  };

  const initialDownloadLink = {
    season_number: 1,
    episode_number: 1,
  };

  const Seasons = () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative border border-[#e84661] rounded-md z-30">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center bg-white/5 text-slate-300 px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
        >
          <span>
            {
              TVInfo?.seasons?.find((s) => s.season_number === seasonColor)
                ?.name
            }
          </span>
          <span className="text-xs ml-1">▼</span>
        </button>
        {open && (
          <div className="absolute  mt-2 w-full rounded-md bg-slate-900 shadow-xl">
            {TVInfo?.seasons?.map((season) => (
              <div
                key={season.season_number}
                onClick={() => {
                  setSeasonColor(season.season_number);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-white/10 ${
                  season.season_number === seasonColor
                    ? "bg-white/15 text-white"
                    : "text-slate-400"
                }`}
              >
                {season.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  const handleGenre = () => {
    const ids = TVInfo?.genres.map((id) => id.id);

    if (!ids) return null;
    return genreData.genres
      .filter((genre) => ids.includes(genre.id))
      .map((genre, index) => (
        <span
          key={index}
          className=" bg-[#2e0e13]/10 text-[#e0435e] border  border-amber-50/10 rounded-md h-7 px-2 py-1 backdrop-blur-lg shadow-2xl"
        >
          {genre.name}
        </span>
      ));
  };
  const [playtrailer, setPlayTrailer] = useState(false);
  const [main, setMain] = useState(true);
  return (
    <div className="min-h-screen  overflow-hidden ">
      <div className="relative h-[40vh] md:h-[80vh] w-full ">
        {handleLoading()}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${Moviebackdrops?.backdrops[1]?.file_path})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
        <div className=" w-full relative  flex h-full items-end"></div>
      </div>
      <div
        className={`flex flex-col max-w-7xl md:text-3xl justify-center items-center mx-auto gap-5 px-8 
  xl:flex-row xl:items-start w-full
`}
      >
        <div
          className={`
               xl:min-w-65 w-fit
               flex justify-center flex-col  `}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300/${Moviebackdrops?.posters[1]?.file_path}`}
            alt=""
          />
          <div className="text-white w-full flex mt-2 flex-col space-y-4">
            <Button className="w-full bg-[#e84661]  hover:bg-[#e84661]  mb-4 py-5 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 text-slate-100 hover:shadow-2xl">
              <Bookmark className=" w-6 h-6 " />
              <span className="font-medium">BOOKMARK</span>
            </Button>

            <div className="text-white w-full flex flex-col space-y-4">
              <Button
                className="w-full bg-white text-black font-semibold py-5 rounded-lg border border-slate-500/30 shadow-md transition-all duration-300 ease-in-out hover:scale-105"
                variant="outline"
              >
                <Forward color="#000000" className=" w-6 h-6 " />
                <span className="font-medium">SHARE</span>
              </Button>
            </div>
          </div>

          <div className="w-full text-xs mt-4 bg-slate-900/20 border border-slate-800/30 rounded-lg backdrop-blur-lg shadow-xl">
            <div className="px-6 py-5">
              <h1 className="text-slate-300 text-xl mb-4 font-semibold border-b-2 border-[#e84661] pb-2">
                Info
              </h1>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">
                    First Air Date
                  </span>
                  <span>{TVInfo?.first_air_date}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">
                    Last Air Date
                  </span>
                  <span>{TVInfo?.last_air_date}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">Seasons</span>
                  <span>{TVInfo?.number_of_seasons}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">Episodes</span>
                  <span>{TVInfo?.number_of_episodes}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span className="font-medium text-slate-400">Status</span>
                  <span>{TVInfo?.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" h-full md:ml-18 ">
            <div className="pt-2  ">
              <h1 className="text-slate-300 font-semibold text-xl  max-w-[30ch] mb-4 md:text-4xl md:font-black  ">
                {TVInfo?.original_name}
              </h1>
            </div>
            <div className="  gap-1 w-full  flex flex-wrap text-yellow-500 text-sm ">
              <span className="   border border-amber-50/10 rounded-md px-2 h-7 py-1 backdrop-blur-lg shadow-2xl">
                TV
              </span>
              <span className="flex justify-center items-center text-xs  gap-0.5  bg-amber-400/10  border h-7 border-amber-50/10 rounded-md px-2 py-1 backdrop-blur-lg shadow-2xl">
                <Star color="#ffdd00" className="fill-amber-300 w-2" />
                {TVInfo?.vote_average.toFixed(1)}
              </span>
              <span className="flex flex-wrap mb-5 text-xs items-center justify-center gap-2">
                {handleGenre()}
              </span>
            </div>
            <div>
              <div className="mt-5 ">
                <h1 className="text-slate-400 font-semibold text-xl mb-2 border-b-amber-50/20 border-b">
                  Overview
                </h1>
                <div className="h-fit overflow-auto bg-white/5  backdrop-blur-md rounded-xl border-white/5   transition-all duration-300 hover:border-blue-950 hover:border">
                  <p className="text-slate-400 p-4 text-xs md:text-[1rem]  max-w-[120ch] leading-relaxed">
                    {TVInfo?.overview}
                  </p>
                </div>
              </div>
              <div className="flex text-slate-300 mt-8 italic w-full justify-center">
                <small className="text-sm">
                  If the content is wrong or not working, please try switching
                  to main 2
                </small>
              </div>
              <div className=" mt-2  flex flex-col sm:flex-row sm:gap-3 justify-center gap-2">
                <div>
                  <Button
                    onClick={() => {
                      setMain(true);
                    }}
                    className={`w-full border ${
                      main ? `bg-[#e84661]` : `bg-transparent`
                    } active:bg-[#e84661] border-[#e84661]  hover:bg-transparent  mb-4 py-5 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 text-slate-100 hover:shadow-2xl`}
                  >
                    <Zap color="#ffffff" className=" w-6 h-6 " />
                    <span className="font-medium">MAIN </span>
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setMain(false);
                    }}
                    className={`w-full border ${
                      !main ? `bg-[#e84661]` : `bg-transparent`
                    } active:bg-[#e84661] border-[#e84661]  hover:bg-transparent  mb-4 py-5 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 text-slate-100 hover:shadow-2xl`}
                  >
                    <Zap color="#ffffff" className=" w-6 h-6 " />
                    <span className="font-medium">MAIN 2</span>
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
                    <Youtube color="#ffffff" className=" w-6 h-6 " />

                    <span className="font-medium">TRAILER</span>
                  </Button>
                  {playtrailer && (
                    <div className="fixed z-60 episode-scroll inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex justify-center items-center ">
                      <div className="relative w-[80vw] h-[40vh] sm:w-[50vw] sm:h-[50vh] ">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${handleTrailer()}?autoplay=1&controls=1&rel=0&modestbranding=1`}
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
                <div>
                  <Button
                    onClick={() => handleDownloadClick(initialDownloadLink)}
                    className="w-full bg-transparent border-[#e84661] border  hover:bg-[#e84661]  mb-4 py-5 rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 text-slate-100 hover:shadow-2xl"
                  >
                    <Download className=" w-6 h-6 " />
                    <span className="font-medium">DOWNLOAD</span>
                  </Button>
                </div>
              </div>
              <div
                className={`my-5 ${
                  !download ? `z-50` : ``
                } relative    backdrop-blur-md`}
              >
                <div className="flex gap-2 relative  text-xs flex-wrap">
                  {Seasons()}
                </div>
              </div>
              <div>
                <div className="flex w-full z-0 relative flex-wrap gap-2 justify-center sm:justify-start">
                  <div className="max-h-150 w-full episode-scroll relative  overflow-y-auto divide-y divide-white/10">
                    {TVEpisodeInfo?.episodes.map((detail, index) => (
                      <div
                        key={index}
                        className="relative flex justify-between gap-3 items-center"
                      >
                        <div
                          id="play"
                          onClick={() =>
                            main === true
                              ? navigate(
                                  `/watch/${TVInfo.id}/${detail.season_number}/${detail.episode_number}`
                                )
                              : navigate(
                                  `/watch/main2/${TVInfo.id}/${detail.season_number}/${detail.episode_number}`
                                )
                          }
                          className="group flex items-center   py-4 hover:bg-white/5 cursor-pointer transition"
                        >
                          <div className="w-6 text-xl text-slate-400 font-semibold">
                            {detail.episode_number}
                          </div>

                          <div className="relative w-20  max-w-35 pr-2">
                            <img
                              className="rounded-md  object-cover"
                              src={
                                detail.still_path
                                  ? `https://image.tmdb.org/t/p/w200/${detail.still_path}`
                                  : `https://image.tmdb.org/t/p/original/${Moviebackdrops?.posters[3].file_path}`
                              }
                              alt=""
                            />
                          </div>

                          <div className="flex-1 min-w-0  ">
                            <h3 className="text-white md:text-lg leading-relaxed ml-1 text-sm mb-1">
                              {detail.name}
                            </h3>
                            <p className="text-sm md:text-md leading-relaxed text-slate-400  line-clamp-2">
                              {detail.overview}
                            </p>
                          </div>
                        </div>
                        <div className="  px-3 ">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                            <button onClick={() => handleDownloadClick(detail)}>
                              <Download color="#e84661" />
                            </button>
                            {download && (
                              <div className="fixed episode-scroll inset-0 bg-black bg-opacity-70 backdrop-blur-lg flex justify-center items-center ">
                                <div className="relative w-full h-full max-w-4xl max-h-96">
                                  <iframe
                                    src={`https://dl.vidsrc.vip/tv/${TVInfo?.id}/${selectedEpisode.season_number}/${selectedEpisode.episode_number}`}
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
