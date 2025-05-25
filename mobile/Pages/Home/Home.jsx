import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "../../components/Nav";

const Home = () => {
  const [token, setToken] = useState("");
  const [matches, setMatches] = useState([]);
  const navigation = useNavigation();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  const getMatches = async () => {
    const res = await fetch(`${process.env.IP4V}/matches?limit=10&page=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setMatches(data.data);
  };

  const handleMatchDetails = (item) => {
    console.log(item);
    navigation.navigate("MatchDetails", {
      matchId: item._id,
    });
  };

  useEffect(() => {
    getToken();
    getMatches();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <>
          <FlatList
            data={matches}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>📍 {item.location}</Text>
                <Text style={styles.cardDate}>
                  🗓️ {new Date(item.date).toLocaleDateString()} at {item.time}
                </Text>
                <Text style={styles.cardPlayers}>
                  👥 {item.players.length} / {item.maxPlayers} players
                </Text>
                <Pressable
                  onPress={() => handleMatchDetails(item)}
                  style={styles.matchDetails}
                >
                  <Text style={styles.cardButton}>View Details</Text>
                </Pressable>
              </View>
            )}
          />
        </>
        <NavBar />
      </SafeAreaView>
    </>
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
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F41BB",
    marginBottom: 8,
    textAlign: "center",
  },
  cardLocation: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
    textAlign: "center",
  },
  cardDate: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  cardPlayers: {
    fontSize: 15,
    color: "#1F41BB",
    textAlign: "center",
    marginBottom: 4,
  },
  canceled: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  matchDetails: {
    marginTop: 5,
  },
  cardButton: {
    backgroundColor: "#1F41BB",
    color: "#fff",
    padding: 5,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
});
