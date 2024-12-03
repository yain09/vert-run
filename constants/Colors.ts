// Colores comunes para ambos temas
const activeOpacity = 0.8;

const accentColorLight = "#4d256e";
const accentColorDark = "#d90b75";

const textColorLight = "#121212";
const textColorDark = "#fff";

// Colores por tema
export const Colors = {
  light: {
    primary: accentColorLight,
    background: "#ffffff",
    text: textColorLight,
    tabBarActiveTintColor: accentColorLight, // Nombre más claro
    tabBarInactiveTintColor: "#888888", // Nombre más claro
    hover: accentColorLight,
    cardBackground: "#ddd",
    sportIcons: "#000000",
  },

  dark: {
    primary: accentColorDark,
    background: "#000",
    text: textColorDark,
    tabBarActiveTintColor: accentColorDark, // Nombre más claro
    tabBarInactiveTintColor: "#AAAAAA", // Nombre más claro
    hover: accentColorDark,
    cardBackground: "#222",
    sportIcons: "#ffffff",
  },
};
