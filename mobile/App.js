import Login from "./Pages/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import Register from "./Pages/Register";
import Home from "./Pages/Home";

const RootStack = createNativeStackNavigator({
  screens: {
    Login: Login,
    Home: Home,
    Register: Register,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
