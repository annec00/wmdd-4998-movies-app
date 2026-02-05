import { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Media } from "../../types/Media";
import { RootStackParamList } from "../../types/navigation";
import CategorySelector from "../forms/CategorySelector";
import MediaList from "../lists/MediaList";
import { Category } from "../../types/Category";

type MediaListContainerProps = {
  fetchData: (category: string) => Promise<Media[]>;
  categories: Category[];
  defaultCategory: string;
};

const MediaListContainer = (props: MediaListContainerProps) => {
  const { fetchData, categories, defaultCategory } = props;
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchItems = async (category: string) => {
    setLoading(true);
    setSelectedCategory(category);
    const data = await fetchData(category);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems(defaultCategory);
  }, [defaultCategory]);

  const handleItemPress = (item: Media) => {
    navigation.navigate("Show Movie", {
      id: item.id,
      mediaType: item.media_type,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <View style={styles.selectorContainer}>
            <CategorySelector
              categories={categories}
              defaultCategory={selectedCategory}
              onCategoryChange={fetchItems}
            />
          </View>
          <ActivityIndicator
            size="large"
            color="#d84286"
            style={styles.loader}
          />
        </>
      ) : (
        <MediaList
          items={items}
          onMoreDetailsPress={handleItemPress}
          headerComponent={
            <CategorySelector
              categories={categories}
              defaultCategory={selectedCategory}
              onCategoryChange={fetchItems}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  selectorContainer: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MediaListContainer;
