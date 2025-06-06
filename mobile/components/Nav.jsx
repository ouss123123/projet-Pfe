import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.nav}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.link}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.link}>Register</Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("SearchMatch")}
      >
        <Text style={styles.link}>Home</Text>
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("SearchMatch")}
      >
        <Text style={styles.link}>SearchMatch</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2233a3",
    paddingVertical: 18,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: "#2e3bbd",
    marginTop: 100,
  },
  link: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: "#304ffe",
    borderRadius: 24,
    overflow: "hidden",
    marginHorizontal: 6,
    textAlign: "center",
    letterSpacing: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
});
export default NavBar;
