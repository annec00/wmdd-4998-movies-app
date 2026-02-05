import { Ionicons } from "@expo/vector-icons";
import { Button, Input } from "@rneui/themed";
import { StyleSheet, View, Text } from "react-native";
import { SEARCH_TYPES } from "../../constants/categories";
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import { useTheme } from "@rneui/themed";

type SearchFormProps = {
  onSearch: (query: string, searchType: string) => void;
};

const SearchForm = (props: SearchFormProps) => {
  const { onSearch } = props;
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { theme } = useTheme();

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (errorMessage) setErrorMessage("");
  };

  const handleSearchTypeChange = (value: string) => {
    setSearchType(value);
    if (errorMessage) setErrorMessage("");
  };

  const handleSearch = () => {
    setErrorMessage("");

    if (!query.trim()) {
      setErrorMessage("Movie/TV show name is required");
      return;
    }

    if (!searchType) {
      setErrorMessage("Please select a search type");
      return;
    }

    onSearch(query, searchType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Movie/TV Show Name*</Text>

      <Input
        value={query}
        onChangeText={handleQueryChange}
        placeholder="Search for movies or TV shows..."
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.inputInnerContainer}
        inputStyle={styles.input}
        leftIcon={
          <Ionicons
            name="search"
            type="feather"
            size={20}
            color={theme.colors.grey1}
          />
        }
      />

      <Text style={styles.label}>Choose Search Type*</Text>
      <View style={styles.row}>
        <CategorySelector
          categories={SEARCH_TYPES}
          defaultCategory=""
          onCategoryChange={handleSearchTypeChange}
        />

        <Button
          title="Search"
          onPress={handleSearch}
          buttonStyle={styles.button}
          icon={
            <Ionicons
              name="search"
              type="feather"
              size={18}
              color={theme.colors.white}
              style={styles.buttonIcon}
            />
          }
        />
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  inputInnerContainer: {
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  button: {
    paddingHorizontal: 24,

    height: 48,
  },
  buttonIcon: {
    marginRight: 8,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 8,
    marginBottom: 4,
  },
});

export default SearchForm;
