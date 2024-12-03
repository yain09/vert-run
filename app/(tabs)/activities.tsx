// Archivo: app/screens/ActivitiesScreen.tsx

import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTheme } from "../hooks/ThemeContext";
import { Colors } from "@/constants/Colors";
import activitiesData from "../json/activities.json";
import ActivityIcon from "../components/ActivityIcon";
import { Ionicons } from "@expo/vector-icons";

const ActivitiesScreen = () => {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM d, yyyy, HH:mm 'hs'", { locale: es });
    } catch (error) {
      console.error("Error formateando la fecha:", error);
      return "Invalid Date";
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} hr ${minutes % 60} min`;
    } else {
      return `${minutes} min`;
    }
  };

  const checkForMedal = (activity) => {
    const medals = [];
    // Check if the distance exceeds 10 km or time exceeds 1 hour
    if (activity.distance > 10000) medals.push("10K");
    if (activity.moving_time > 3600) medals.push("+1hr");
    return medals;
  };

  const renderActivityDetails = (item: any) => {
    switch (item.sport_type) {
      case "Workout":
        return (
          <>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Fecha: {formatDate(item.start_date_local)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Tiempo: {formatTime(item.moving_time)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Frec Card Promedio: {item.average_heartrate} bpm
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Frec Card Máxima: {item.max_heartrate} bpm
            </Text>
          </>
        );
      case "Run":
      case "Virtual Run":
      case "Ride":
        return (
          <>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              {formatDate(item.start_date_local)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Tiempo: {formatTime(item.moving_time)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Distancia: {(item.distance / 1000).toFixed(2)} km
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Desnivel Positivo: {item.total_elevation_gain} m
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Frec Card Máxima: {item.max_heartrate} bpm
            </Text>
          </>
        );
      case "Walk":
        return (
          <>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              {formatDate(item.start_date_local)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Tiempo: {formatTime(item.moving_time)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Distancia: {(item.distance / 1000).toFixed(2)} km
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Desnivel Positivo: {item.total_elevation_gain} m
            </Text>
          </>
        );
      case "Swim":
        return (
          <>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              {formatDate(item.start_date_local)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Tiempo: {formatTime(item.moving_time)}
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Distancia: {(item.distance / 1000).toFixed(2)} km
            </Text>
            <Text style={[styles.text, { color: Colors[theme].text }]}>
              Frec Card Promedio: {item.average_heartrate} bpm
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <FlatList
        data={activitiesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const medals = checkForMedal(item); // Get medals
          return (
            <View
              style={[
                styles.card,
                { backgroundColor: Colors[theme].cardBackground },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.title, { color: Colors[theme].text }]}>
                  {item.name}
                </Text>
                {/* Render medals if they exist */}
                <View style={styles.medalContainer}>
                  {medals.includes("10K") && (
                    <View style={styles.medal}>
                      <Ionicons
                        name="medal-outline"
                        size={16}
                        color={Colors[theme].hover}
                      />
                      <Text
                        style={[
                          styles.medalText,
                          { color: Colors[theme].text },
                        ]}
                      >
                        10K
                      </Text>
                    </View>
                  )}
                  {medals.includes("+1hr") && (
                    <View style={styles.medal}>
                      <Ionicons
                        name="medal-outline"
                        size={16}
                        color={Colors[theme].hover}
                      />
                      <Text
                        style={[
                          styles.medalText,
                          { color: Colors[theme].text },
                        ]}
                      >
                        +1HR
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.iconContainer}>
                <ActivityIcon type={item.type} size={50} />
                <View style={styles.infoContainer}>
                  {renderActivityDetails(item)}{" "}
                  {/* Render the activity details */}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  list: {
    width: "100%",
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
  cardHeader:{
    flex: 1,
flexDirection: "row",
justifyContent: "space-between",
  }
  ,
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
  medalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  medal: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 10,
  },
  medalText: {
    fontSize: 10,
    },
  text: {
    fontSize: 14,
  },
  infoContainer: {
    marginLeft: 10,
  },
});

export default ActivitiesScreen;
