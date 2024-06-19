import Header from "../header";
import { useNowPlayingMovies } from "../shared/hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import MoviesListContainer from "./MoviesListContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <MoviesListContainer />
    </div>
  );
};

export default Browse;
