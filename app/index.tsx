// Archivo: app/index.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Animated, // Importar Animated
  ImageBackground, // Importar ImageBackground
} from "react-native";
import { useTheme } from "./hooks/ThemeContext";
import { Colors } from "@/constants/Colors";
import * as AuthSession from "expo-auth-session";
import { useRouter, useNavigation } from "expo-router";
import LogoSVG from "./components/LogoSVG";

const clientId = "141567";
const clientSecret = "398a1d8b2b3d6e327db0aaf9bd788e4acec02b4f";
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

export default function index() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  // Definir las animaciones de escala y opacidad
  const [scale] = useState(new Animated.Value(1)); // Escala inicial de 1
  const [fade] = useState(new Animated.Value(1)); // Opacidad inicial de 1

  const handleMockLogin = () => {
    setIsLoading(true);

    // Animar el fondo al 160%, cambiar la opacidad a 0.5 (semi-transparente), y luego regresar a su estado inicial
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.6, // Escalar al 160%
          duration: 2500, // Duración de la animación (2.5 segundos)
          useNativeDriver: true, // Usar el driver nativo para mejor rendimiento
        }),
        Animated.timing(fade, {
          toValue: 0.0, // Reducir la opacidad a 0.5
          duration: 2000, // Duración de la animación (2.5 segundos)
          useNativeDriver: true, // Usar el driver nativo para mejor rendimiento
        }),
      ]),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1, // Regresar a la escala original
          duration: 2500, // Duración de la animación (2.5 segundos)
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 1, // Regresar la opacidad a 1 (completamente opaco)
          duration: 2500, // Duración de la animación (2.5 segundos)
          useNativeDriver: true,
        }),
      ]),
    ]).start(); // Iniciar la secuencia de animaciones

    setTimeout(() => {
      setIsLoading(false);
      router.push({ pathname: "/(tabs)/profile" });
    }, 2000); // Esperar a que las animaciones terminen
  };

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      responseType: "code",
      scopes: ["activity:read"],
    },
    { authorizationEndpoint: "https://www.strava.com/oauth/authorize" }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const code = response.params.code;
      exchangeCodeForToken(code)
        .then((token) => {
          setAccessToken(token);
          navigation.replace("/(tabs)/profile");
        })
        .catch((error) => {
          console.error("Error al autenticar:", error);
          Alert.alert("Error", "No se pudo completar la autenticación.");
        });
    }
  }, [response]);

  const exchangeCodeForToken = async (code: string): Promise<string> => {
    try {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: "authorization_code",
        }).toString(),
      });

      const data = await response.json();
      if (data.access_token) {
        return data.access_token;
      } else {
        throw new Error(data.message || "Error al obtener el token.");
      }
    } catch (error) {
      console.error("Error en la solicitud del token:", error);
      throw error;
    }
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale }], opacity: fade }]}
    >
      <ImageBackground
        source={require("@/assets/images/bg2.png")} // Ruta de la imagen de fondo
        style={styles.backgroundImage} // Aplica el estilo para cubrir toda la pantalla
      >
        <View style={styles.logoContainer}>
          <LogoSVG size={200} />
        </View>

        <Text style={[styles.title, { color: Colors[theme].text }]}>
          ¡Bienvenido a VertRun!
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors[theme].tint} />
        ) : (
          <View style={styles.buttonContainer}>
            <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
              Elige cómo iniciar sesión
            </Text>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: Colors[theme].primary },
              ]}
              onPress={handleMockLogin}
            >
              <Text style={styles.buttonText}>LOG IN MOCKUP</Text>
            </Pressable>
            <Text style={[styles.smallText, { color: Colors[theme].text }]}>
              Para pruebas
            </Text>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: Colors[theme].primary },
              ]}
              onPress={() => {
                console.log("Iniciando autenticación...");
                promptAsync();
              }}
            >
              <Text style={styles.buttonText}>LOG IN STRAVA</Text>
            </Pressable>
            <Text style={[styles.smallText, { color: Colors[theme].text }]}>
              Autenticación oficial
            </Text>
          </View>
        )}
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent", // Fondo transparente si es necesario
  },
  logoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  smallText: {
    fontSize: 12,
    marginTop: 0,
    marginBottom: 32,
  },
});
