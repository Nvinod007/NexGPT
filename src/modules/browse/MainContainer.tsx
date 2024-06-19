import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./components/VideoTitle";
import VideoBackground from "./components/VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store: any) => store.movies?.nowPlayingMovies);

  if (!Object.keys(movies).length) return <></>;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title ?? ""} overview={overview ?? ""} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
