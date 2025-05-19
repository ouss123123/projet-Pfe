import { SafeAreaView } from "react-native";
import Register from "../auth/register";
import Login from "../auth/login";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Login></Login>
    </SafeAreaView>
  );
}
