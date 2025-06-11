import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.nav}>
      <Pressable
        style={({ pressed }) => [
          styles.linkButton,
          pressed && styles.linkButtonPressed,
        ]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.linkText}>Home</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.linkButton,
          pressed && styles.linkButtonPressed,
        ]}
        onPress={() => navigation.navigate("CreateMatch")}
      >
        <Text style={styles.linkText}>Create Match</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.linkButton,
          pressed && styles.linkButtonPressed,
        ]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.linkText}>Profile</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.linkButton,
          pressed && styles.linkButtonPressed,
        ]}
        onPress={() => navigation.navigate("SearchMatch")}
      >
        <Text style={styles.linkText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#1F41BB",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  linkButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    backgroundColor: "#304ffe",
    borderRightWidth: 1,
    borderRightColor: "#2233a3",
  },
  linkButtonPressed: {
    backgroundColor: "#2233a3",
    opacity: 0.85,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
});

export default NavBar;