// Archivo: app/(tabs)/_layout.tsx

import React from "react";
import { View, Switch, StyleSheet, SafeAreaView } from "react-native";
import { Tabs } from "expo-router";
import { useTheme } from "../hooks/ThemeContext"; // Usamos useTheme para obtener el tema actual
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; // Para los colores del tema
import LogoSVG from "../components/LogoSVG"; // Importa tu componente SVG

export default function TabLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <LogoSVG />
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          thumbColor={theme === "dark" ? "#FFFFFF" : "#000000"}
          trackColor={{
            false: "#B0B0B0",
            true: theme === "dark" ? "#B0B0B0" : "#B0B0B0",
          }}
        />
      </View>

      <SafeAreaView
        style={[
          styles.bodyContainer,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[theme].tabBarActiveTintColor,
            tabBarInactiveTintColor: Colors[theme].tabBarInactiveTintColor,
            tabBarStyle: {
              backgroundColor: Colors[theme].background,
              borderTopColor: Colors[theme].cardBackground,

              height: 70,
              paddingTop: 8, // Altura personalizada de las tabs
              justifyContent: "center", // Alineación del contenido vertical
              alignItems: "center", // Alineación del contenido horizontal
            },
            headerShown: false,
          }}
        >
          {" "}
          <Tabs.Screen
            name="profile"
            options={{
              title: "Perfil",
              
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={30}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="activities"
            options={{
              title: "Actividades",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "flash" : "flash-outline"}
                  size={30}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="monthly-stats"
            options={{
              title: "Estadísticas",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "clipboard" : "clipboard-outline"}
                  size={30}
                  color={color}
                />
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
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 10,
    width: "100%",
  },
  bodyContainer: {
    flex: 1,
    overflow: "hidden",
  },
});
