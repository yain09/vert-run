// Archivo: app/_layout.tsx

import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "./hooks/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}