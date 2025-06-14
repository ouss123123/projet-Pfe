import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  const getUserData = async () => {
    const res = await fetch(`${process.env.IP4V}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUser(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: (() => {
            if (user?.profile_picture?.includes("uploads")) {
              return `${process.env.IP4V}/uploads/usersImages/${user.profile_picture.slice(8)}`;
            } else {
              return `${process.env.IP4V}/${user?.profile_picture?.slice(10)}`;
            }
          })(),
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user?.name ?? "N/A"}</Text>
      <Text style={styles.email}>📧 {user?.email ?? "N/A"}</Text>
      <Text style={styles.phone}>📱 {user?.phone ?? "N/A"}</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.stats}>
          Matches Played: <Text style={styles.value}>{user?.stats?.matchesPlayed ?? 0}</Text>
        </Text>
        <Text style={styles.stats}>
          MVPs: <Text style={styles.value}>{user?.stats?.mvpCount ?? 0}</Text>
        </Text>
        <Text style={styles.stats}>
          Ratings: <Text style={styles.value}>{user?.stats?.rating?.totalRatings ?? 0}</Text>
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.chatButton,
          pressed && { backgroundColor: "#0a2e9b" },
        ]}
        onPress={() => navigation.navigate("Chat", { userId })}
      >
        <Text style={styles.chatButtonText}>Chat</Text>
      </Pressable>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    margin: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F41BB",
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 2,
  },
  phone: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  statsContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stats: {
    fontSize: 16,
    color: "#444",
    marginVertical: 4,
  },
  value: {
    fontWeight: "bold",
    color: "#1F41BB",
  },
  chatButton: {
    backgroundColor: "#1F41BB",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  chatButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
