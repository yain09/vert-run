import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors"; 
import { useTheme } from "../hooks/ThemeContext"; 
import athletesData from "../json/athletes.json"; 
import MonthlyStats from "./monthly-stats";
const ProfileScreen = () => {
  const { theme } = useTheme(); 
  const { firstname, lastname, weight, city, state, profile_picture } = athletesData; // Asegúrate de que profile_picture esté en el JSON

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <Image 
        source={{ uri: profile_picture }} // Si tienes la URL de la imagen
        style={styles.profileImage}
      />
      <Text
        style={[styles.title, { color: Colors[theme].text }]}
      >
        Perfil de {firstname} {lastname}
      </Text>
      <Text
        style={[styles.text, { color: Colors[theme].text }]}
      >
        Ciudad: {city}, {state}
      </Text>
      <Text
        style={[styles.text, { color: Colors[theme].text }]}
      >
        Peso: {weight} kg
      </Text>
      
      {/* Aquí puedes renderizar las estadísticas de los últimos meses */}
      {/* <MonthlyStats /> */}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center", // Centrado de contenido
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default ProfileScreen;
