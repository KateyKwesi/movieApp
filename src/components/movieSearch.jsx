import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { GridLoader } from "react-spinners";
import { Card } from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export const MovieSearch = ({ search }) => {
  const navigate = useNavigate();
  const SearchMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
    return res.data;
  };
  const {
    data: SearchMovie,
    isLoading: SearchLoading,
    error: SearchError,
  } = useQuery({
    queryKey: ["searchMovie", search],
    queryFn: SearchMovies,
    enabled: !!search,
  });

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 8 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 5 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  return (
    <div>
      <div className="flex justify-center">
        {SearchLoading && <GridLoader color="#ffffff" />}
      </div>
      {search && (
        <div className="mx-5">
          <p className="text-slate-400 font-semibold text-2xl mb-2 border-b-amber-50/20 border-b">
            Movie <span className="italic text-amber-50">results</span>
          </p>
        </div>
      )}
      {SearchMovie?.results && (
        <Carousel responsive={responsive} infinite itemClass="px-2">
          {SearchMovie?.results?.map((movie) => (
            <Card
              {...movie}
              src={`movieInfo`}
              click={() => navigate(`/watch/${movie.id}`)}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};
