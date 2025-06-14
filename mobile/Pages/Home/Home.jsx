import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "../../components/Navbar/Nav";

const Home = () => {
  const [token, setToken] = useState("");
  const [matches, setMatches] = useState([]);
  const navigation = useNavigation();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  const getMatches = async () => {
    try {
      const res = await fetch(`${process.env.IP4V}/matches?limit=10&page=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMatches(data.data || []);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getMatches();
    }
  }, [token]);

  const handleMatchDetails = (item) => {
    navigation.navigate("MatchDetails", { matchId: item._id });
  };

  const handleCreateMatchNavigation = () => {
    navigation.navigate("CreateMatch");
  };

  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Welcome to Our Platform</Text>
          <Text style={styles.heroSubtitle}>
            Discover amazing features and possibilities
          </Text>
        </View>

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
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>

      <View style={styles.navBarWrapper}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 30,
    marginBottom: 25,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F41BB",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#4a4a4a",
    textAlign: "center",
    marginBottom: 15,
  },
  heroButton: {
    backgroundColor: "#1F41BB",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  heroButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#1F41BB",
    borderRadius: 10,
    paddingVertical: 14,
    marginHorizontal: 8,
    alignItems: "center",
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 25,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F41BB",
    marginBottom: 8,
    textAlign: "center",
  },
  cardLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
    textAlign: "center",
  },
  cardDate: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
    textAlign: "center",
  },
  cardPlayers: {
    fontSize: 16,
    color: "#1F41BB",
    marginBottom: 12,
    textAlign: "center",
  },
  matchDetails: {
    alignItems: "center",
  },
  cardButton: {
    backgroundColor: "#1F41BB",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  navBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
});
