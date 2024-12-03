// Archivo: constants/Colors.ts

// Colores comunes para ambos temas
const activeOpacity = 0.8; // Opacidad de los elementos activos (80%)

const accentColorLight = "#ff2a00";
const accentColorDark = "#d90b75";

const textColorLight = "#121212";
const textColorDark = "#fff";

// Colores por tema
export const Colors = {
  light: {
    accent: accentColorLight, // Color de acento para modo claro
    background: "#ffffff", // Fondo blanco para el modo claro
    text: textColorLight, // Color del texto en modo claro
    link: accentColorLight, // Los links tendrán el mismo color de acento
    hover: accentColorLight, // Hover de los links o botones
    textColor: textColorLight, // Color para el texto en modo claro
    tint: accentColorLight, // Acento para íconos y otros elementos destacados
    icon: "#888888", // Color de los íconos
    tabIconDefault: "#888888", // Color de los íconos en las tabs por defecto
    tabIconSelected: accentColorLight, // Color del ícono seleccionado
    activeOpacity, // Opacidad activa para elementos como botones
    cardBackground: "#ddd", // Fondo de las tarjetas (modo claro)
  },

  dark: {
    accent: accentColorDark, // Color de acento para modo oscuro
    background: "#000", // Fondo oscuro para el modo oscuro
    text: textColorDark, // Color del texto en modo oscuro
    link: accentColorDark, // Los links tendrán el mismo color de acento
    hover: accentColorDark, // Hover de los links o botones
    textColor: textColorDark, // Color para el texto en modo oscuro
    backgroundBody: "#111", // Fondo del cuerpo en modo oscuro
    tint: accentColorDark, // Acento para íconos y otros elementos destacados
    icon: "#9BA1A6", // Color de los íconos en modo oscuro
    tabIconDefault: "#9BA1A6", // Color de los íconos en las tabs por defecto
    tabIconSelected: accentColorDark, // Color del ícono seleccionado
    activeOpacity, // Opacidad activa para elementos como botones
    cardBackground: "#222", // Fondo de las tarjetas (modo oscuro)
  },
};
