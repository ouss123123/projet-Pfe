import { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
const Login = lazy(() => import("./Pages/Auth/Login"));
const Register = lazy(() => import("./Pages/Auth/Register"));
const Home = lazy(() => import("./Pages/Home/Home"));
const MatchDetails = lazy(() => import("./Pages/Match/MatchDetails"));
const CreateMatch = lazy(() => import("./Pages/Match/CreateMatch"));
const Profile = lazy(() => import("./Pages/Profile/Profile.jsx"));
const SearchMatch = lazy(() => import("./Pages/Match/SearchMatch.jsx"));
const Chat = lazy(() => import("./Pages/Chat/Chat")); 
const UserProfile = lazy(() => import("./Pages/Profile/UserProfile"));


const RootStack = createNativeStackNavigator({
  screens: {
    Login: Login,
    Home: Home,
    Register: Register,
    MatchDetails: MatchDetails,
    CreateMatch: CreateMatch,
    Profile: Profile,
    SearchMatch : SearchMatch,
    UserProfile : UserProfile,
    Chat : Chat
  },
  screenOptions: {
    headerShown: true,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
