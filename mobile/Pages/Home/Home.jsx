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
    navigation.navigate("MatchDetails", {
      matchId: item._id,
    });
  };

  const handleCreateMatchNavigation = () => {
    navigation.navigate("CreateMatch");
  };

  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getMatches();
    }
  }, [token]);

  return (
    <SafeAreaView>
      <SafeAreaView style={styles}>
        <NavBar />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Welcome to Our Platform</Text>
            <Text style={styles.heroSubtitle}>
              Discover amazing features and possibilities
            </Text>
            <Pressable style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Get Started</Text>
            </Pressable>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Our Features</Text>
            <View style={styles.featuresContainer}>
              <View style={styles.featureCard}>
                <Text style={styles.featureIcon}>🚀</Text>
                <Text style={styles.featureTitle}>Fast & Efficient</Text>
                <Text style={styles.featureText}>
                  Lightning-fast performance for your needs
                </Text>
              </View>
              <View style={styles.featureCard}>
                <Text style={styles.featureIcon}>🛡️</Text>
                <Text style={styles.featureTitle}>Secure</Text>
                <Text style={styles.featureText}>
                  Your data is safe with us
                </Text>
              </View>
              <View style={styles.featureCard}>
                <Text style={styles.featureIcon}>👥</Text>
                <Text style={styles.featureTitle}>Community</Text>
                <Text style={styles.featureText}>
                  Join our growing community
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              onPress={handleCreateMatchNavigation}
              style={styles.createMatchContainer}
            >
              <Text style={styles.createMatch}>Create Match</Text>
            </Pressable>
            <Pressable
              onPress={handleProfileNavigation}
              style={styles.createMatchContainer}
            >
              <Text style={styles.createMatch}>Visit Profile</Text>
            </Pressable>
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
          />

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of satisfied users today
            </Text>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Sign Up Now</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },

  // Hero
  hero: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F41BB",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  heroButton: {
    backgroundColor: "#1F41BB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  heroButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Features
  featuresSection: {
    marginVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },
  featureCard: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  featureTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  featureText: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },

  // Buttons
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  createMatchContainer: {
    width: "48%",
  },
  createMatch: {
    backgroundColor: "#1F41BB",
    width: "100%",
    borderRadius: 8,
    color: "#fff",
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },

  // Match Card
  card: {
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
  matchDetails: {
    marginTop: 5,
  },
  cardButton: {
    backgroundColor: "#1F41BB",
    color: "#fff",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "bold",
  },

  // CTA
  ctaSection: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 12,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 15,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
