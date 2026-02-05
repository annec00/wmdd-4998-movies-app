import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MoviesScreen from "../screens/MoviesScreen";
import SearchScreen from "../screens/SearchScreen";
import TVShowsScreen from "../screens/TVShowsScreen";
import { useTheme } from "@rneui/themed";

const Tab = createMaterialTopTabNavigator();
const TopTabNavigator = () => {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.grey3,
                tabBarStyle: { backgroundColor: theme.colors.background },
                tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
                tabBarLabelStyle: { fontWeight: "bold" },
            }}
        >
            <Tab.Screen name="Movies" component={MoviesScreen} options={{ title: "Movies" }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
            <Tab.Screen name="TV Shows" component={TVShowsScreen} options={{ title: "TV Shows" }} />
        </Tab.Navigator>
    );
};

export default TopTabNavigator;
