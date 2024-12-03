// Archivo: app/(tabs)/_layout.tsx

import React from "react";
import { View, Switch, StyleSheet, SafeAreaView } from "react-native";
import { Tabs } from "expo-router";
import { useTheme } from "../hooks/ThemeContext"; // Usamos useTheme para obtener el tema actual
import { IconSymbol } from "@/components/ui/IconSymbol"; // Importa IconSymbol
import { Colors } from "@/constants/Colors"; // Para los colores del tema
import LogoSVG from "../components/LogoSVG"; // Importa tu componente SVG

export default function TabLayout() {
  const { theme, toggleTheme } = useTheme(); // Accedemos al tema y la función toggle

  const handleThemeToggle = () => {
    toggleTheme(); // Cambiar el tema al hacer clic en el Switch
    console.log("Tema cambiado a:", theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Header con el texto dinámico del título de la pantalla y el Switch */}
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <LogoSVG />

        <Switch
          value={theme === "dark"}
          onValueChange={handleThemeToggle}
          thumbColor={theme === "dark" ? "#FFFFFF" : "#000000"}
          trackColor={{
            false: "#B0B0B0", // Color gris cuando está desactivado
            true: theme === "dark" ? "#B0B0B0" : "#009688", // Color cuando está activado
          }}
        />
      </View>

      {/* Cuerpo de la web con fondo dinámico */}
      <SafeAreaView
        style={[
          styles.bodyContainer,
          { backgroundColor: Colors[theme].backgroundBody },
        ]}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[theme].tint,
            headerShown: false, // No queremos mostrar el header en las Tabs
          }}
        >
          <Tabs.Screen
            name="activities"
            options={{
              tabBarIcon: ({ color }) => (
                <IconSymbol size={24} name="bicycle" color={color} />
              ),
              tabBarOnPress: () => setHeaderText("Activities"),
            }}
          />
          <Tabs.Screen
            name="monthly-stats"
            options={{
              tabBarIcon: ({ color }) => (
                <IconSymbol size={24} name="chart.bar" color={color} />
              ),
              tabBarOnPress: () => setHeaderText("Monthly Stats"),
            }}
          />
          {/* Nueva pestaña para el perfil */}
          <Tabs.Screen
            name="profile"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={24} name="person" color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
   
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
  },
});
