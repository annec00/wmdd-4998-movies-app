import MediaListContainer from "../components/containers/MediaListContainer";
import { TV_CATEGORIES } from "../constants/categories";
import { getTVShowsByCategory } from "../services/api";

const TVShowsScreen = () => {
  return (
    <MediaListContainer
      categories={TV_CATEGORIES}
      defaultCategory={TV_CATEGORIES[0].value}
      fetchData={getTVShowsByCategory}
    />
  );
};

export default TVShowsScreen;
