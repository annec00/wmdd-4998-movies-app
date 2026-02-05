import { Button, Card } from "@rneui/themed";
import { Image, StyleSheet, Text, View } from "react-native";
import { getMediaReleaseDate, getMediaTitle, Media } from "../../types/Media";

type MediaCardProps = {
  media: Media;
  onPress: () => void;
};

const MediaCard = (props: MediaCardProps) => {
  const { media, onPress } = props;
  const imageUrl = `https://image.tmdb.org/t/p/w200${media.poster_path}`;
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.content}>
        {/* Left: Image (1/3) */}
        <Image source={{ uri: imageUrl }} style={styles.image} />

        {/* Right: Details (2/3) */}
        <View style={styles.details}>
          <Text style={styles.title}>{getMediaTitle(media)}</Text>
          <Text style={styles.info}>Popularity: {media.popularity}</Text>
          <Text style={styles.info}>Release Date: {getMediaReleaseDate(media)}</Text>
          <Button title="More Details" onPress={onPress}></Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    margin: 8,
  },
  content: {
    flexDirection: "row", // Horizontal layout
  },
  image: {
    width: "33%", // 1/3 width
    height: 150,
    resizeMode: "cover",
  },
  details: {
    flex: 1, // 2/3 width
    padding: 12,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
export default MediaCard;
