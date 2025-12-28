import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const popular = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const fetchTv = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const allTrending = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieNowPlaying = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieTop = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieUpComing = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieAction = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=28",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieAdventure = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=12",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieAnimation = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=16",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieComedy = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=35",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieCrime = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=80",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieDocumentary = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=99",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieDrama = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=18",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieFamily = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=10751",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieFantasy = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=14",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieHistory = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=36",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieHorror = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=27",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieMusic = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=10402",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieMystery = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=9648",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieRomance = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=10749",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieScienceFiction = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=878",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieTVMovie = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=10770",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieThriller = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=53",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieWar = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=10752",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const MovieWestern = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?with_genres=37",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

//tv section

export const TopTv = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TrendingTv = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const popularTv = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/tv/popular?language=en-US",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const airingTv = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/tv/airing_today?language=en-US",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const onairTv = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/tv/on_the_air?language=en-US",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

//genre

export const TvActionAdventure = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10759",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvAnimation = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=16",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvComedy = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=35",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvCrime = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=80",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvDocumentary = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=99",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvDrama = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=18",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvFamily = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10751",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvKids = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10762",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvMystery = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=9648",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvNews = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10763",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvReality = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10764",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvSciFiFantasy = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10765",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvSoap = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10766",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvTalk = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10767",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvWarPolitics = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=10768",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};

export const TvWestern = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/discover/tv?with_genres=37",
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  return res.data;
};
