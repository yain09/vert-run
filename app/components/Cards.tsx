// Archivo: app/components/Cards.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // Usamos useTheme en lugar de useColorScheme
import { Colors } from "@/constants/Colors"; // Para los colores del tema

type CardProps = {
  title: string;
  content: string[];
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  const { theme } = useTheme(); // Accedemos al tema usando useTheme

  return (
    <View style={[styles.card, { backgroundColor: Colors[theme].cardBackground }]}>  {/* Usamos theme.cardBackground para el fondo de las tarjetas */}
      <Text style={[styles.title, { color: Colors[theme].text }]}>{title}</Text>  {/* Usamos theme.text para el texto */}
      {content.map((line, index) => (
        <Text key={index} style={[styles.text, { color: Colors[theme].text }]}>{line}</Text>  
        /* Aplicamos el color de texto */
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Esto crea la sombra para las tarjetas
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default Card;
