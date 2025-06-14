import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import io from "socket.io-client";

const socket = io(process.env.IP4V);

const Chat = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const route = useRoute();
  const { userId } = route.params;
  const [senderId, setSenderId] = useState("");

  const getAuthData = async () => {
    const t = await AsyncStorage.getItem("token");
    const u = await AsyncStorage.getItem("userId");
    if (t && u) {
      setToken(t);
      setSenderId(u);
    }
  };

  const getUserById = async () => {
    try {
      const res = await fetch(`${process.env.IP4V}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const text = await res.text();
      const json = JSON.parse(text);
      setUser({
        name: json?.data?.name || "Unknown",
        email: json?.data?.email || "",
      });
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  const getMessages = async () => {
    try {
      const res = await fetch(`${process.env.IP4V}/messages/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIds: [senderId, userId] }),
      });
      const text = await res.text();
      const data = JSON.parse(text);
      setMessages(data);
    } catch (err) {
      console.error("Message fetch error:", err);
    }
  };

  const handleMessageSubmit = async () => {
    if (!message.trim()) return;
    try {
      await fetch(`${process.env.IP4V}/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender: senderId,
          receiver: userId,
          message,
        }),
      });
      socket.emit("chat message", {
        sender: senderId,
        receiver: userId,
        message,
      });
      setMessage("");
      getMessages();
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  useEffect(() => {
    getAuthData();
  }, []);

  useEffect(() => {
    if (token && senderId) {
      getMessages();
      getUserById();
    }
  }, [token, senderId]);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      if (
        (msg.sender === senderId && msg.receiver === userId) ||
        (msg.sender === userId && msg.receiver === senderId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("chat message", handleNewMessage);
    return () => socket.off("chat message", handleNewMessage);
  }, [senderId, userId]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {user?.name || "User"}
        </Text>
        <Text style={{ color: "gray" }}>{user?.email || ""}</Text>

        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                alignSelf:
                  item.sender === senderId ? "flex-end" : "flex-start",
                backgroundColor:
                  item.sender === senderId ? "#007bff" : "#f0f0f0",
                padding: 10,
                borderRadius: 10,
                marginVertical: 4,
                maxWidth: "80%",
              }}
            >
              {item.sender !== senderId && (
                <Text style={{ fontWeight: "bold" }}>{user?.name}</Text>
              )}
              <Text
                style={{
                  color: item.sender === senderId ? "#fff" : "#000",
                }}
              >
                {item.message}
              </Text>
            </View>
          )}
        />
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        />
        <TouchableOpacity onPress={handleMessageSubmit} style={{ marginLeft: 10 }}>
          <Text style={{ color: "blue", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
