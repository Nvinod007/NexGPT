import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../../shared/utils/privateConstants";
import { addTrailerVideo } from "../../redux/movieSlice";
import { TMDB_VIDEO_URL } from "../../shared/utils/constants";

const useMovieTrailer = (movieId: string) => {
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(
      TMDB_VIDEO_URL + movieId + "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter(
      (video: { type: string }) => video.type === "Trailer"
    );
    const trailer = filterData.length ? filterData[0] : json.results[0];
    console.log("trailer", trailer);
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
