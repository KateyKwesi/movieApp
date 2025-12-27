import { motion, scale } from "framer-motion";
import { Star, Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

export function Card({
  id,
  title,
  vote_average,
  poster_path,
  release_date,
  first_air_date,
  name,
  src,
  click,
}) {
  const daysChildren = {
    hidden: { opacity: 0.8, y: 20 },
    visible: {
      opacity: 0.8,
      y: 0,
      transition: { ease: `easeIn`, duration: 0.15 },
    },
  };
  return (
    <motion.div
      variants={daysChildren}
      whileHover={{ opacity: 1, scale: 1.1 }}
      key={id}
      transition={{ ease: `easeIn`, duration: 0.8 }}
      className=" rounded-2xl 
            bg-dark-100/40 
            p-2
            mx-2flex flex-col items-center
            shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05),0_4px_20px_rgba(206,206,251,0)] 
            backdrop-blur-md 
            border border-white/10 overflow-hidden"
    >
      <div
        className="  relative flex  justify-center  hover:cursor-pointer"
        onClick={click}
      >
        <img
          className=" rounded-sm object-contain  p-2 "
          src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
          alt={`${title}`}
        />
        <div className="absolute top-2.5 right-4 ">
          <div className="relative flex items-center justify-center text-4xl ">
            {
              <Star
                color="#fb923c"
                className="fill-orange-400 h-10 w-10 shadow-lg "
              />
            }
            <span className="absolute  text-xs font-black text-amber-950  drop-shadow-sm font-roboto">
              {vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: `easeIn`, duration: 0.8 }}
        className="  bg-slate-950/30  flex flex-col  justify-end p-2"
      >
        <div className="bg-transparent px-2  hover:text-white  text-white/70 ">
          <p className=" pb-2 font-semibold max-w-[40ch] ">{title || name}</p>
          <div className="flex justify-between items-center px-2 font-semibold text-xs">
            <span className="uppercase">
              {release_date?.split(`-`)[0] || first_air_date?.split(`-`)[0]}
            </span>

            <Link to={`/${src}/${id}`} state={{ id: id }}>
              <span onClick={() => {}}>
                <Info className="w-4" />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
