import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { lazy } from "react";
const Navbar = lazy(() => import("../../components/Navbar/Nav.jsx"));

const CreateMatch = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("2025-06-20");
  const [time, setTime] = useState("20:00");
  const [userId, setUserId] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [token, setToken] = useState("");
  const [stadiums, setStadiums] = useState([]);
  const [price, setPrice] = useState([]);

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");
    setToken(token);
    setUserId(userId);
  };

  const fetchStadiums = async () => {
    const res = await fetch(`${process.env.IP4V}/stadiums`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setStadiums(data.data);
  };

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.IP4V}/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        location,
        price,
        date,
        time,
        maxPlayers: maxPlayers,
        createdBy: userId,
        players: [],
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    getUserId();
  }, []);
  useEffect(() => {
    if (token) fetchStadiums();
  }, [token]);
  console.log(location);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{padding : 24}}>
        <Text style={styles.header}>Create Match</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Match Title"
          />
          <Text style={styles.label}>Location</Text>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
          >
            {stadiums?.map((stadium) => (
              <Picker.Item
                key={stadium._id}
                label={stadium.name}
                value={stadium.name}
              />
            ))}
          </Picker>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="HH:MM"
          />
          <Text style={styles.label}>Max Players</Text>

          <TextInput
            style={styles.input}
            value={maxPlayers}
            onChangeText={setMaxPlayers}
            placeholder="Max Players"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Price</Text>

          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
            keyboardType="numeric"
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Navbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    position: "relative",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F41BB",
    textAlign: "center",
    marginBottom: 10,
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
});

export default CreateMatch;
