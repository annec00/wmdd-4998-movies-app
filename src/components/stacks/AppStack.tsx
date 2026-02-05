import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopTabNavigator from "../../navigation/TopTabNavigator";
import ShowScreen from "../../screens/ShowScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={TopTabNavigator}
                    options={{
                        title: "Movies App",
                        headerStyle: { backgroundColor: "#93185a" },
                        headerTintColor: "#fff",
                        headerTitleStyle: { fontWeight: "bold" },
                    }}
                />
                <Stack.Screen name="Show Movie" component={ShowScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;
