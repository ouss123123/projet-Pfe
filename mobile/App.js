import Login from "./Pages/Auth/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home/Home";
import MatchDetails from "./Pages/Match/MatchDetails";

const RootStack = createNativeStackNavigator({
  screens: {
    Login: Login,
    Home: Home,
    Register: Register,
    MatchDetails: MatchDetails,
  },
  screenOptions: {
    headerShown: true,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
