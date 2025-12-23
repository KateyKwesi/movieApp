import { motion, scale } from "framer-motion";
import { Star, Play, Info } from "lucide-react";
import { IdInfo } from "./Info";
import { Link } from "react-router-dom";

export const MovieCard = ({ discover }) => {
  const daysParent = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 1, delayChildren: 0.15 },
    },
  };
  const daysChildren = {
    hidden: { opacity: 0.8, y: 20 },
    visible: {
      opacity: 0.8,
      y: 0,
      transition: { ease: `easeIn`, duration: 0.15 },
    },
  };

  return (
    <div className="w-full  flex justify-center">
      <motion.div
        variants={daysParent}
        initial="hidden"
        animate="visible"
        className="text-white w-full overflow-hidden  grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 place-items-center  "
      >
        {discover?.results.map((movie) => {
          return (
            <motion.div
              variants={daysChildren}
              whileHover={{ opacity: 1, scale: 1.1 }}
              key={movie.id}
              transition={{ ease: `easeIn`, duration: 0.8 }}
              className=" rounded-2xl 
            bg-dark-100/40 
            p-5 
            shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05),0_4px_20px_rgba(206,206,251,0)] 
            backdrop-blur-md 
            border border-white/10 overflow-hidden"
            >
              <div
                className=" p-2 relative "
                onClick={() => {
                  window.open(`/play/${movie.id}`, "_blank");
                }}
              >
                <img
                  className=" rounded-sm object-cover "
                  src={`https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  alt={`${movie.title}`}
                />
                <div className="absolute top-2.5 right-4 ">
                  <div className="relative flex items-center justify-center text-4xl ">
                    {
                      <Star
                        color="#fb923c" // a richer amber tone
                        className="fill-orange-400 h-10 w-10 shadow-lg "
                      />
                    }
                    <span className="absolute  text-xs font-black text-amber-950  drop-shadow-sm font-roboto">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
                <button
                  className="absolute top-40 left-20 "
                  onClick={() => {
                    window.open(`/play/${movie.id}`, "_blank");
                  }}
                ></button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: `easeIn`, duration: 0.8 }}
                className="  bg-slate-950/30 w-50  flex flex-col  justify-end"
              >
                <div className="bg-transparent p-2  hover:text-white  text-white/70 ">
                  <p className=" pb-4 font-semibold max-w-[40ch] ">
                    {movie?.title}
                  </p>
                  <div className="flex justify-between items-center px-2 font-semibold text-xs">
                    <span className="uppercase">{movie.original_language}</span>
                    <Link to="/Info" state={{ id: movie.id }}>
                      <span
                        onClick={() => {
                          <IdInfo id={movie.id} />;
                        }}
                      >
                        <Info className="w-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
