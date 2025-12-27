import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "./Card";
import { fetchTv } from "./fetchMovies";
import { useQuery } from "@tanstack/react-query";
import { TVIdInfo } from "./tvInfo";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const TVCard = () => {
  const navigate = useNavigate();

  const { data: tvDiscover, isLoading } = useQuery({
    queryKey: ["tv-discover"],
    queryFn: fetchTv,
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
        <p className="text-slate-400 font-semibold text-xl mb-5 p-2 border-b-amber-50/20 border-b">
          TV SHOWS
        </p>
      </div>
      <div className="text-white w-full  overflow-hidden">
        <Carousel responsive={responsive} infinite itemClass="px-2">
          {tvDiscover?.results?.map((movie) => (
            <motion.div key={movie.id} layout>
              <Card
                {...movie}
                src={`tvInfo`}
                click={() => navigate(`/tvInfo/${movie.id}`)}
              />
            </motion.div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
