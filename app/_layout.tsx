// Archivo: app/_layout.tsx

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "./hooks/ThemeContext"; // Asegúrate de importar el ThemeProvider
import { Colors } from "@/constants/Colors"; // Para manejar los colores según el tema

export default function RootLayout() {
  return (
    <ThemeProvider> {/* Asegúrate de envolver toda la aplicación con el ThemeProvider */}
      <ThemeContent />
    </ThemeProvider>
  );
}

const ThemeContent = () => {
  const { theme } = useTheme(); // Obtener el tema actual

  return (
    <>
      <StatusBar
        style={theme === "dark" ? "light" : "dark"} // Cambiar el color del texto en función del tema
        backgroundColor={Colors[theme].background}  // Fondo de la barra de estado según el tema
      />
      <Stack screenOptions={{ headerShown: false }} style={{ flex: 1 }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
};
