// Archivo: app/(tabs)/monthly-stats.tsx

import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import Card from "../components/Cards";
import { useTheme } from "../hooks/ThemeContext"; // Usamos useTheme en lugar de useColorScheme
import { Colors } from "@/constants/Colors"; // Para los colores del tema

const mockStats = [
  {
    id: 1,
    month: "November",
    distance: "120 km",
    time: "6 hrs",
    elevationGain: "500 m",
  },
  {
    id: 2,
    month: "October",
    distance: "90 km",
    time: "4.5 hrs",
    elevationGain: "300 m",
  },
  {
    id: 3,
    month: "September",
    distance: "100 km",
    time: "5 hrs",
    elevationGain: "400 m",
  },
];

const MonthlyStatsScreen = () => {
  const { theme } = useTheme(); // Accedemos al tema usando useTheme

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].backgroundBody }]}> {/* Aplica el fondo del cuerpo según el tema */}
      <FlatList
        data={mockStats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.month}
            content={[
              `Total Distance: ${item.distance}`,
              `Total Time: ${item.time}`,
              `Total Elevation Gain: ${item.elevationGain}`,
            ]}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MonthlyStatsScreen;
