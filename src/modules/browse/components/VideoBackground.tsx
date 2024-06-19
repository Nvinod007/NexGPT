import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { YOUTUBE_EMBED_URL } from "../../shared/utils/constants";

const VideoBackground = ({ movieId }: { movieId: string }) => {
  const trailerVideo = useSelector((store: any) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className=" w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          YOUTUBE_EMBED_URL + trailerVideo?.key + "?&autoplay=1&mute=1&loop=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
};

export default VideoBackground;
