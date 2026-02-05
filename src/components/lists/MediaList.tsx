import { FlatList, View, StyleSheet } from "react-native";
import { Media } from "../../types/Media";
import MediaCard from "../listItems/MediaCard";
import { ReactNode, useState } from "react";
import { Button } from "@rneui/themed";

type MediaListProps = {
  items: Media[];
  onMoreDetailsPress: (movie: Media) => void;
  headerComponent?: ReactNode;
};

const MediaList = (props: MediaListProps) => {
  const { items, onMoreDetailsPress, headerComponent } = props;
  const [currentPage, setCurrentPage] = useState(1);

  // Get paginated items (10 per page)
  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return items.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePreviousPage = () => {
    setCurrentPage(1);
  };

  // Render pagination footer
  const renderFooter = () => {
    const totalPages = Math.ceil(items.length / 10);

    if (totalPages <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        {currentPage === 2 && (
          <Button
            title="Previous Page"
            onPress={handlePreviousPage}
            buttonStyle={styles.paginationButton}
          />
        )}
        {currentPage === 1 && totalPages > 1 && (
          <Button
            title="Next Page"
            onPress={handleNextPage}
            buttonStyle={styles.paginationButton}
          />
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={getPaginatedItems()}
      renderItem={({ item }) => (
        <MediaCard media={item} onPress={() => onMoreDetailsPress(item)} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={headerComponent ? () => <>{headerComponent}</> : undefined}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    padding: 16,
    alignItems: "center",
  },
  paginationButton: {
    minWidth: 150,
  },
});

export default MediaList;
