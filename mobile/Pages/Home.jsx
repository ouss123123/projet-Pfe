import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Discover Your Dream Job here</Text>
        <Text style={styles.subtitle}>
          Explore all the existing job roles based on your interest and study
          major
        </Text>
      </View>

      <View style={styles.buttons}>
        
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 30,
  },
  image: {
    width: "100%",
    height: null,
    aspectRatio: 1 / 0.9,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 35,
    lineHeight: 42,
    color: "#1F41BB",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
});
