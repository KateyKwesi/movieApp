import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { GridLoader } from "react-spinners";
import { MovieCard } from "./movieCard";

const TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState(``);

  const SearchMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
    return res.data;
  };
  const {
    data: SearchMovie,
    isLoading: SearchLoading,
    error: SearchError,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: SearchMovies,
    enabled: !!searchTerm,
  });

  return (
    <div>
      <div className="pt-50 flex justify-center pb-10 bg-transparent ">
        <div className="flex relative w-3xl h-10 justify-center  bg-white/10 backdrop-blur-lg rounded-md px-4 shadow-sm ring-1 ring-white/10 ">
          <SearchIcon className="absolute top-0 w-5 mt-2 left-3 " />
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Search for your favroit"
            className="  w-full flex-1 bg-transparent px-4 py-3 pl-12 !text-search-text focus:outline-none sm:py-3 sm:pr-3 transition-all duration-500 font-medium placeholder-search-placeholder text-white/80 "
          />
        </div>
      </div>
      <div className="flex justify-center">
        {SearchLoading && <GridLoader color="#ffffff" />}
      </div>
      <MovieCard discover={SearchMovie} />
    </div>
  );
};
