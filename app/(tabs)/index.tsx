// Archivo: app/index.tsx

import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // Hook para el tema
import { Colors } from "@/constants/Colors"; // Colores del tema
import { useNavigation } from "expo-router"; // Usamos navegación para redirigir

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleMockLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace("/(tabs)/profile"); // Redirige a la pantalla de perfil
    }, 2000); // Simula un login por 2 segundos
  };

  const handleRealLogin = () => {
    console.log("Iniciando autenticación real...");
    // Aquí puedes integrar el proceso real de autenticación
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>
        ¡Bienvenido! Elige cómo iniciar sesión
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors[theme].tint} />
      ) : (
        <>
          <Button title="Log In (Mock)" onPress={handleMockLogin} />
          <Text style={[styles.smallText, { color: Colors[theme].text }]}>mockup</Text>

          <Button title="Log In (Real)" onPress={handleRealLogin} />
        </>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  smallText: {
    fontSize: 12,
    marginTop: 5,
  },
});
