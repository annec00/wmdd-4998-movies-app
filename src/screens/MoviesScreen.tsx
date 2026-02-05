import MediaListContainer from "../components/containers/MediaListContainer";
import { MOVIE_CATEGORIES } from "../constants/categories";
import { getMoviesByCategory } from "../services/api";

const MoviesScreen = () => {
  return (
    <MediaListContainer
      categories={MOVIE_CATEGORIES}
      defaultCategory={MOVIE_CATEGORIES[0].value}
      fetchData={getMoviesByCategory}
    />
  );
};

export default MoviesScreen;
