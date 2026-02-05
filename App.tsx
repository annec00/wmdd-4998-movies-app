import { ThemeProvider, createTheme } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppStack from "./src/components/stacks/AppStack";

const theme = createTheme({
  lightColors: {
    primary: "#93185a",
    secondary: "#f05098",
    background: "#fff",
    white: "#fff",
    black: "#333",
    grey0: "#ddd",
    grey1: "#999",
    grey3: "#d6a0b8",
    grey4: "#fef5f9",
  },
  darkColors: {
    primary: "#93185a",
    secondary: "#f05098",
    background: "#1a1a1a",
    white: "#fff",
    black: "#333",
    grey0: "#ddd",
    grey1: "#999",
    grey2: "#666",
    grey3: "#d6a0b8",
    grey4: "#fef5f9",
  },
  components: {
    Button: {
      raised: true,
      buttonStyle: {
        backgroundColor: "#f05098",
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <AppStack />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
