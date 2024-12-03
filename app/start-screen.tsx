// Archivo: app/start-screen.tsx

import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useTheme } from "./hooks/ThemeContext";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import LogoSVG from "./components/LogoSVG";

export default function StartScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleMockLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace("/(tabs)/profile");
    }, 2000);
  };

  const handleRealLogin = () => {
    // Aquí irá tu lógica de login real con Strava
    console.log("Iniciando autenticación real...");
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.logoContainer}>
        <LogoSVG />
      </View>
      
      <Text style={[styles.title, { color: Colors[theme].text }]}>¡Bienvenido a VertRun!</Text>
      <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
        Elige cómo iniciar sesión
      </Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors[theme].tint} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Log In (Mock)" onPress={handleMockLogin} />
          <Text style={[styles.smallText, { color: Colors[theme].text }]}>Para pruebas</Text>

          <Button title="Log In con Strava" onPress={handleRealLogin} />
          <Text style={[styles.smallText, { color: Colors[theme].text }]}>Autenticación oficial</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },
  smallText: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 15,
  },
});