import { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Media } from "../../types/Media";
import { RootStackParamList } from "../../types/navigation";
import { searchMovies, searchMulti, searchTV } from "../../services/api";
import SearchForm from "../forms/SearchForm";
import MediaList from "../lists/MediaList";
import { useTheme } from "@rneui/themed";

const SearchContainer = () => {
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  const handleSearch = async (query: string, searchType: string) => {
    setLoading(true);
    setHasSearched(true);

    let results: Media[] = [];

    if (searchType === "movie") {
      results = await searchMovies(query);
    } else if (searchType === "tv") {
      results = await searchTV(query);
    } else if (searchType === "multi") {
      results = await searchMulti(query);
    }

    setItems(results);
    setLoading(false);
  };

  const handleItemPress = (item: Media) => {
    navigation.navigate("Show Movie", {
      id: item.id,
      mediaType: item.media_type,
    });
  };

  return (
    <View style={styles.container}>
      <SearchForm onSearch={handleSearch} />

      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      )}

      {/* Empty state */}
      {!loading && !hasSearched && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Please enter a search term to find movies or TV shows
          </Text>
        </View>
      )}

      {/* No results State */}
      {!loading && hasSearched && items.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found. Try a different search term.</Text>
        </View>
      )}

      {/* Results list */}
      {!loading && items.length > 0 && (
        <MediaList items={items} onMoreDetailsPress={handleItemPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default SearchContainer;