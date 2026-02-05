import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getMediaReleaseDate, getMediaTitle, Media } from "../../types/Media";
import { RootStackParamList } from "../../types/navigation";
import { getMovieById, getTVShowById, getTMDBImageUrl } from "../../services/api";
import { useTheme } from "@rneui/themed";

type MediaDetailContainerProps = {
  id: number;
  mediaType: "movie" | "tv";
};

const MediaDetailContainer = ({ id, mediaType }: MediaDetailContainerProps) => {
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  // Fetch media details
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = mediaType === "movie" 
        ? await getMovieById(id)
        : await getTVShowById(id);
      setMedia(data);
      setLoading(false);
    };
    
    fetchDetails();
  }, [id, mediaType]);

  // Set header title
  useEffect(() => {
    if (media) {
      navigation.setOptions({
        title: getMediaTitle(media),
      });
    }
  }, [navigation, media]);

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Error state
  if (!media) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error loading media details</Text>
      </View>
    );
  }

  const imageUrl = getTMDBImageUrl("w500", media.poster_path);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{getMediaTitle(media)}</Text>
      <Image source={{ uri: imageUrl || undefined }} style={styles.image} />
      <Text style={styles.overview}>{media.overview}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.meta}>Popularity: {media.popularity}</Text>
        <Text style={styles.meta}> | </Text>
        <Text style={styles.meta}>
          {media.media_type === "movie" ? "Release Date" : "First Aired"}:{" "}
          {getMediaReleaseDate(media)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  meta: {
    fontSize: 14,
    color: "#666",
  },
});

export default MediaDetailContainer;