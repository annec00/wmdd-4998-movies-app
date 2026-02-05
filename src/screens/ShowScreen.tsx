import { RouteProp, useRoute } from "@react-navigation/native";
import MediaDetailContainer from "../components/containers/MediaDetailContainer";
import { RootStackParamList } from "../types/navigation";

type ShowScreenRouteProp = RouteProp<RootStackParamList, "Show Movie">;

const ShowScreen = () => {
  const route = useRoute<ShowScreenRouteProp>();
  const { id, mediaType } = route.params;

  return <MediaDetailContainer id={id} mediaType={mediaType} />;
};

export default ShowScreen;
