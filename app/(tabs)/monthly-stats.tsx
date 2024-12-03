import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Colors } from "@/constants/Colors"; // Colores del tema

const mockStats = [
  { id: 1, month: "November", distance: "120 km", time: "6 hrs", elevationGain: "500 m" },
  { id: 2, month: "October", distance: "90 km", time: "4.5 hrs", elevationGain: "300 m" },
  { id: 3, month: "September", distance: "100 km", time: "5 hrs", elevationGain: "400 m" },
];

const MonthlyStatsScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <FlatList
        data={mockStats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: Colors[theme].cardBackground }]}>
            <Text style={[styles.title, { color: Colors[theme].text }]}>{item.month}</Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Total Distance: {item.distance}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Total Time: {item.time}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Total Elevation Gain: {item.elevationGain}
            </Text>
          </View>
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
  card: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
});

export default MonthlyStatsScreen;
