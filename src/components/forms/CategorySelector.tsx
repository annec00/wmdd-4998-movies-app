import { useState } from "react";
import { BottomSheet, ListItem, Button, useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Category } from "../../types/Category";

type CategorySelectorProps = {
  categories: Category[];
  defaultCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategorySelector = (props: CategorySelectorProps) => {
  const { categories, defaultCategory, onCategoryChange } = props;
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [isVisible, setIsVisible] = useState(false);

  // Helper function to get the label for the selected category
  const getSelectedLabel = () => {
    const selected = categories.find((cat) => cat.value === selectedCategory);
    return selected ? selected.label : "Select Search Type";
  };

  // Handlers
  const openSheet = () => setIsVisible(true);
  const closeSheet = () => setIsVisible(false);

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange(value);
    closeSheet();
  };

  return (
    <>
      {/* Button to open BottomSheet */}
      <Button
        onPress={openSheet}
        title={getSelectedLabel()}
        containerStyle={{ flex: 1 }}
        buttonStyle={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.grey0,
          borderWidth: 1,
          paddingHorizontal: 15,
          paddingVertical: 12,
        }}
        titleStyle={{
          color: theme.colors.black,
          fontSize: 16,
        }}
        icon={
          <Ionicons
            name="chevron-down"
            size={20}
            color={theme.colors.black}
            style={{ marginLeft: 8 }}
          />
        }
        iconRight
        type="outline"
      />

      {/* BottomSheet with category options */}
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={closeSheet}
        modalProps={{}}
        containerStyle={{ margin: 0, marginBottom: -40 }}
      >
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingBottom: 40
          }}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category.value;

            return (
              <ListItem
                key={category.value}
                onPress={() => handleSelect(category.value)}
                containerStyle={{
                  backgroundColor: isSelected
                    ? theme.colors.grey4
                    : theme.colors.background,
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{category.label}</ListItem.Title>
                </ListItem.Content>
                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={24}
                    color={theme.colors.primary}
                  />
                )}
              </ListItem>
            );
          })}
        </ScrollView>
      </BottomSheet>
    </>
  );
};

export default CategorySelector;
