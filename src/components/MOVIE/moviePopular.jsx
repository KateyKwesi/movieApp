import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "../Card";
import { popular } from "../fetchMovies";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Popularmovies = () => {
  const navigate = useNavigate();

  const { data: MoviesPopular, isLoading } = useQuery({
    queryKey: ["movies-popular"],
    queryFn: popular,
  });

  if (isLoading)
    return (
      <DotLottieReact
        src="https://lottie.host/e46b32c4-9a01-4db9-8d08-dd7aee566294/0UL52NAswZ.lottie"
        loop
        autoplay
      />
    );

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5.5 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };
  return (
    <div className="max-w-7xl mx-auto flex flex-col  justify-center overflow-hidden">
      <div className="text-amber-50">
        <h1 className="inline-block text-white text-2xl tracking-widest  font-semibold  m-5 border-b-4 border-slate-800">
          POPULAR NOW
        </h1>
      </div>
      <div className="text-white w-full  overflow-hidden">
        <Carousel responsive={responsive} infinite itemClass="px-2">
          {MoviesPopular?.results?.map((movie) => (
            <motion.div key={movie.id} layout>
              <Card
                {...movie}
                src={`movieInfo`}
                click={() => navigate(`/watch/${movie.id}`)}
              />
            </motion.div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
