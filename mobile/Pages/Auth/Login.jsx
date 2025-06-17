import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput, 
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.IP4V}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      await AsyncStorage.setItem("token", data.data.token);
      await AsyncStorage.setItem("userId", data.data._id);
      await AsyncStorage.setItem("avatar", data.data.profile_picture);
      await AsyncStorage.setItem("name", data.data.name);
      if(data.message === "Login successful"){
        navigation.navigate("Home")
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Welcome Back</Text>
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
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.forgotPassword}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1c1c1e",
    textAlign: "center",
    marginBottom: 40,
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
    elevation: 1,
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
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  forgotPassword: {
    color: "#5856D6",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
  },
});
 


// Login component for user authentication


export default Login;
