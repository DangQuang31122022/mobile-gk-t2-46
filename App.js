import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import LoginScreen from "./screens/Screen1";
import ElectronicsScreen from "./screens/Screen2";

const RootStack = createNativeStackNavigator({
  screens: {
    Screen1: LoginScreen,
    Screen2: ElectronicsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <Navigation />
    </PaperProvider>
  );
}
