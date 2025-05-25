import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {StyleSheet} from "react-native";
import Navbar from "../../components/Nav";

const MatchDetails = () => {
  const [token, setToken] = useState("");
  const [match, setMatch] = useState(null);
  const route = useRoute();
  const { matchId } = route.params;
  const navigation = useNavigation();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  const getMatchDetails = async () => {
    const res = await fetch(`${process.env.IP4V}/matches/${matchId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setMatch(data.data);
  };

  useEffect(() => {
    getToken();
    getMatchDetails();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{match?.title}</Text>
      <Text style={styles.location}>📍 {match?.location}</Text>
      <Text style={styles.date}>
        🗓️ {new Date(match?.date).toLocaleDateString()} at {match?.time}
      </Text>
      <Text style={styles.players}>
        👥 {match?.players.length} / {match?.maxPlayers} players
      </Text>
      {match?.isCanceled && (
        <Text style={styles.canceled}>Canceled</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  loading: {
    fontSize: 18,
    color: "#888",
  },
  card: {
    margin: 30,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F41BB",
    marginBottom: 10,
    textAlign: "center",
  },
  location: {
    fontSize: 18,
    color: "#555",
    marginBottom: 6,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
    textAlign: "center",
  },
  players: {
    fontSize: 16,
    color: "#1F41BB",
    marginBottom: 6,
    textAlign: "center",
  },
  canceled: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});

export default MatchDetails;
