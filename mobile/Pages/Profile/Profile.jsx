import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";

const Profile = () => {
  const [token, setToken] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState("");
  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    const profilePic = await AsyncStorage.getItem("avatar");
    const name = await AsyncStorage.getItem("name");
    const userId = await AsyncStorage.getItem("userId");
    setToken(token);
    setProfilePic(profilePic);
    setName(name);
    setUserId(userId);
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
      },
      async (response) => {
        if (response?.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setAvatar(asset.uri);
          if (asset.base64) {
            setAvatarBase64(asset.base64);
          }
        }
      }
    );
  };

  let Pic = "";
  if (profilePic?.includes("uploads")) {
    Pic = `${process.env.IP4V}/uploads/usersImages/${profilePic?.slice(8)}`;
  } else {
    Pic = `${process.env.IP4V}/${profilePic?.slice(10)}`;
  }

  

  const updateUserData = async () => {
    const res = await fetch(`${process.env.IP4V}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name : form.name,
        email: form.email,
        phone: form.phone,
        avatar: avatarBase64,
      }),
    });
    const data = res.json();
    console.log(data);
    
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>{name}</Text>
        <Image
          style={styles.userInfoImage}
          source={{
            uri: Pic,
          }}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Match Title"
          onChangeText={(name) => setForm({ ...form, name: name })}
        />
        <TouchableOpacity onPress={selectImage} style={styles.imageButton}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          onChangeText={(email) => setForm({ ...form, email: email })}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          onChangeText={(phone) => setForm({ ...form, phone: phone })}
        />

        <Pressable style={styles.button} onPress={updateUserData}>
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  userInfoImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  userInfoText: {
    marginRight: 12,
    fontSize: 20,
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
  userInfoContainer: {
    marginBottom: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageButton: {
    marginTop: 16,
    width: "100%",
    height: 52,
    backgroundColor: "#eef1f4",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default Profile;
