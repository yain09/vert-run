import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { format } from "date-fns"; // Importa la función de formateo
import { enUS } from "date-fns/locale"; // Configura el idioma si es necesario
import { useTheme } from "../hooks/ThemeContext";
import { Colors } from "@/constants/Colors";
import activitiesData from "../json/activities.json";
import ActivityIcon from "../components/ActivityIcon";

const ActivitiesScreen = () => {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM d, yyyy, HH:mm 'hs'", { locale: enUS }); // Formato en inglés
    } catch (error) {
      console.error("Error formateando la fecha:", error);
      return "Invalid Date";
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours} hr ${minutes % 60} min`;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <FlatList
        style={[styles.list]}
        data={activitiesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: Colors[theme].cardBackground },
            ]}
          >
            <Text style={[styles.title, { color: Colors[theme].text }]}>
              {item.name}
            </Text>
            <View style={styles.iconContainer}>
              <ActivityIcon type={item.type} size={50} />
              <View style={styles.infoContainer}>
                <Text style={[styles.text, { color: Colors[theme].text }]}>
                  Date: {formatDate(item.start_date_local)}
                </Text>
                <Text style={[styles.text, { color: Colors[theme].text }]}>
                  Distance: {(item.distance / 1000).toFixed(2)} km
                </Text>
                <Text style={[styles.text, { color: Colors[theme].text }]}>
                  Time: {formatTime(item.moving_time)}
                </Text>
                <Text style={[styles.text, { color: Colors[theme].text }]}>
                  Elevation Gain: {item.total_elevation_gain} m
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
  },
});

export default ActivitiesScreen;
