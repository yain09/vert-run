// Archivo: app/(tabs)/profile.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Para los colores del tema
import { useTheme } from "../hooks/ThemeContext"; // Para obtener el tema actual
import athletesData from "../json/athletes.json"; // Cargamos los datos del archivo JSON

const ProfileScreen = () => {
  const { theme } = useTheme(); // Obtener el tema actual
  const { firstname, lastname, weight, city, state } = athletesData; // Desestructuramos la info de "athletes.json"

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].backgroundBody }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>
        Perfil de {firstname} {lastname}
      </Text>
      <Text style={[styles.text, { color: Colors[theme].text }]}>Ciudad: {city}, {state}</Text>
      <Text style={[styles.text, { color: Colors[theme].text }]}>Peso: {weight} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default ProfileScreen;
