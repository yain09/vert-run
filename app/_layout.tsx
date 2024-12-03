// Archivo: app/_layout.tsx

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "./hooks/ThemeContext"; 
import { Colors } from "@/constants/Colors"; 

export default function RootLayout() {
  return (
    <ThemeProvider> 
      <ThemeContent />
    </ThemeProvider>
  );
}

const ThemeContent = () => {
  const { theme } = useTheme(); 

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
