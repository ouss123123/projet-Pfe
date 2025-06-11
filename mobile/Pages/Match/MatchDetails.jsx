import React, { lazy, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Map from "../../components/MapNative";
const Navbar = lazy(() => import("../../components/Navbar/Nav"));

const MatchDetails = () => {
  const [token, setToken] = useState("");
  const [match, setMatch] = useState(null);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [lastCommentId, setLastCommentId] = useState("");
  const [comments, setComments] = useState([]);
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const route = useRoute();
  const { matchId } = route.params;
  const navigation = useNavigation();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");
    setUserId(userId);
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
    setLocation(data.stadium.location);
  };
  console.log(location);

  const getComments = async () => {
    const res = await fetch(
      `${process.env.IP4V}/comments/${matchId}?limit=20&lastCommentId=${lastCommentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setComments(data.data);
  };

  const handleJoinMatch = async () => {
    try {
      const res = await fetch(`${process.env.IP4V}/matches/${matchId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          players: [{ user: userId }],
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to join match");
      }
      getMatchDetails();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    const res = await fetch(`${process.env.IP4V}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        createdBy: userId,
        match: matchId,
        comment: comment,
      }),
    });
    const data = await res.json();
    setLastCommentId(data.data._id);
    setComment("");
    getComments();
  };

  const handleLeaveMatch = async () => {
    try {
      const res = await fetch(
        `${process.env.IP4V}/matches/players/${matchId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ playerId: userId }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to leave match");
      }
      getMatchDetails();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getMatchDetails();
      getComments();
    }
  }, [token]);

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentUser}>
        {item.createdBy?.username || "User"}
      </Text>
      <Text style={styles.commentText}>{item.comment}</Text>
      <Text style={styles.commentDate}>
        {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{match?.title}</Text>
          <Text style={styles.location}>📍 {match?.location}</Text>
          <Text style={styles.date}>
            🗓️ {match?.date ? new Date(match.date).toLocaleDateString() : ""} at{" "}
            {match?.time}
          </Text>
          <Text style={styles.players}>
            👥 {match?.players?.length} / {match?.maxPlayers} players
          </Text>
          {match?.isCanceled && <Text style={styles.canceled}>Canceled</Text>}
        </View>
        <View style={styles.commentSection}>
          <Text style={styles.commentTitle}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={renderComment}
            ListEmptyComponent={
              <Text style={styles.emptyComment}>No comments yet.</Text>
            }
            style={{ maxHeight: 250, marginBottom: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Add a comment"
            multiline
            value={comment}
            onChangeText={setComment}
            placeholderTextColor="#aaa"
          />
          <Pressable style={styles.button} onPress={handleComment}>
            <Text style={styles.buttonText}>Submit Comment</Text>
          </Pressable>
          <View style={styles.actionRow}>
            <Pressable
              style={[styles.button, styles.join]}
              onPress={handleJoinMatch}
            >
              <Text style={styles.buttonText}>Join Match</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.leave]}
              onPress={handleLeaveMatch}
            >
              <Text style={styles.buttonText}>Leave Match</Text>
            </Pressable>
          </View>
        </View>
        <Map longitude={location?.longitude} latitude={location?.latitude} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
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
  commentSection: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F41BB",
    marginBottom: 10,
    textAlign: "left",
  },
  commentCard: {
    backgroundColor: "#f5f6fa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  commentUser: {
    fontWeight: "bold",
    color: "#1F41BB",
    marginBottom: 2,
  },
  commentText: {
    fontSize: 15,
    color: "#222",
    marginBottom: 2,
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  emptyComment: {
    color: "#888",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    marginBottom: 12,
    color: "#222",
    minHeight: 48,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1F41BB",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  join: {
    flex: 1,
    backgroundColor: "#1F41BB",
    marginRight: 5,
  },
  leave: {
    flex: 1,
    backgroundColor: "#e11d48",
    marginLeft: 5,
  },
});

export default MatchDetails;
