import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { useTheme } from "./hooks/ThemeContext";
import { Colors } from "@/constants/Colors";
import * as AuthSession from "expo-auth-session";
import { useRouter, useNavigation } from "expo-router";
import LogoSVG from "./components/LogoSVG";
import BgSVG from "./components/BgSVG"; // Importa el SVG como fondo

const clientId = "141567";
const clientSecret = "398a1d8b2b3d6e327db0aaf9bd788e4acec02b4f";
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

export default function index() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  const handleMockLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push({ pathname: "/(tabs)/profile" });
    }, 2000);
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
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <BgSVG style={styles.bg} />
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
            style={[styles.button, { backgroundColor: Colors[theme].primary }]}
            onPress={handleMockLogin}
          >
            <Text style={styles.buttonText}>LOG IN MOCKUP</Text>
          </Pressable>
          <Text style={[styles.smallText, { color: Colors[theme].text }]}>
            Para pruebas
          </Text>
          <Pressable
            style={[styles.button, { backgroundColor: Colors[theme].primary }]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
  objectFit: "cover",
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
