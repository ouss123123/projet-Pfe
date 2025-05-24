import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  ScrollViewBase,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { Link, useRouter } from "expo-router";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<any>();
  const [avatar, setAvatar] = useState<any>(null);
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const router: any = useRouter();

  const selectImage: () => void = () => {
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

  const goToLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister: () => Promise<void> = async () => {
    try {
      console.log("User Data:", { name, email, password, phone, avatarBase64 });

      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          avatar: avatarBase64,
        }),
      });
      const data = await res.json();
      console.log("Response data:", data);
      router.replace("/auth/login");
    } catch (error: any) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Create an Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity onPress={selectImage} style={styles.imageButton}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>

        {avatar && (
          <Image source={{ uri: avatar }} style={styles.imagePreview} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.forgotPassword}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f4f6f8",
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#1c1c1e",
      textAlign: "center",
      marginBottom: 30,
    },
    input: {
      width: "100%",
      height: 52,
      backgroundColor: "#fff",
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#e0e0e0",
      fontSize: 16,
      color: "#1c1c1e",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1, // Android shadow
    },
    imageButton: {
      width: "100%",
      height: 52,
      backgroundColor: "#eef1f4",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    imagePreview: {
      width: 120,
      height: 120,
      alignSelf: "center",
      marginTop: 16,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: "#d1d1d6",
    },
    button: {
      width: "100%",
      height: 52,
      backgroundColor: "#007AFF",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      shadowColor: "#007AFF",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 3, // Android shadow
    },
    buttonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
    },
    forgotPassword: {
      color: "#5856D6",
      fontSize: 16,
      textAlign: "center",
      marginTop: 20,
    },
  });
  

export default Register;
