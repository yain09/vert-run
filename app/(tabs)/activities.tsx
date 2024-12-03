// Archivo: app/(tabs)/activities.tsx

import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Colors } from "@/constants/Colors"; // Colores del tema

const mockActivities = [
  { id: 1, name: "Morning Ride", date: "2024-12-01", distance: "10.5 km" },
  { id: 2, name: "Evening Run", date: "2024-12-01", distance: "5.2 km" },
];

const ActivitiesScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <FlatList
        data={mockActivities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: Colors[theme].cardBackground }]}>
            <Text style={[styles.title, { color: Colors[theme].text }]}>{item.name}</Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Date: {item.date}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Distance: {item.distance}
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

export default ActivitiesScreen;
