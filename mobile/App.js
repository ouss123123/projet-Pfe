import { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
const Login = lazy(() => import("./Pages/Auth/Login"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const Home = lazy(() => import("./Pages/Home/Home"));
const MatchDetails = lazy(() => import("./Pages/Match/MatchDetails"));
const CreateMatch = lazy(() => import("./Pages/Match/CreateMatch"));
const Profile = lazy(() => import("./Pages/Profile/Profile.jsx"))

const RootStack = createNativeStackNavigator({
  screens: {
    Login: Login,
    Home: Home,
    Register: Register,
    MatchDetails: MatchDetails,
    CreateMatch: CreateMatch,
    Profile: Profile,
  },
  screenOptions: {
    headerShown: true,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
