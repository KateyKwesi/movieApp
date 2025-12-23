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
