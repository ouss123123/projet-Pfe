import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Keyboard,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SearchMatch = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [searching, setSearching] = useState(false);
  const [token, setToken] = useState("");
  const [matches, setMatches] = useState([]);
  const navigation = useNavigation();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleSearch = async () => {
    setSearching(true);
    Keyboard.dismiss();
    if (token) {
      const res = await fetch(
        `${process.env.IP4V}/matches/search?title=${title}&location=${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMatches(data.data);
    }
    setSearching(false);
  };

  const renderMatch = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("MatchDetails", { matchId: item._id })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardLocation}>📍 {item.location}</Text>
      <Text style={styles.cardDate}>
        🗓️ {new Date(item.date).toLocaleDateString()} at {item.time}
      </Text>
      <Text style={styles.cardPlayers}>
        👥 {item.players.length} / {item.maxPlayers} players
      </Text>
      {item.isCanceled && (
        <Text style={styles.canceled}>Canceled</Text>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search Match</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter match title"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
          placeholderTextColor="#aaa"
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>
            {searching ? "Searching..." : "Search"}
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={matches}
        keyExtractor={(item) => item._id}
        renderItem={renderMatch}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !searching && (
            <Text style={styles.emptyText}>No matches found.</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F41BB",
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#1F41BB",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    marginBottom: 6,
    color: "#222",
  },
  button: {
    backgroundColor: "#1F41BB",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 18,
    alignItems: "center",
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F41BB",
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  cardPlayers: {
    fontSize: 15,
    color: "#1F41BB",
    marginBottom: 4,
  },
  canceled: {
    color: "red",
    fontWeight: "bold",
    marginTop: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 30,
  },
});

export default SearchMatch;