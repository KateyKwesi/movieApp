import { useParams } from "react-router-dom";

export const PlayMovie = () => {
  const { id } = useParams();
  return (
    <iframe
      className="min-h-screen relative z-50"
      src={`https://www.vidking.net/embed/movie/${id}`}
      width="100%"
      height="100vh"
      frameBorder="0"
      allowFullScreen
      title="Play Movie"
    />
  );
};
