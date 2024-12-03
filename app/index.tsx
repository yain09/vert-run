// Archivo: app/index.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useTheme } from "./hooks/ThemeContext";
import { Colors } from "@/constants/Colors";
import * as AuthSession from "expo-auth-session";
import { Link } from "expo-router";

import { useNavigation } from "@react-navigation/native";
import LogoSVG from "./components/LogoSVG";

const clientId = "141567";
const clientSecret = "398a1d8b2b3d6e327db0aaf9bd788e4acec02b4f";
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

export default function index() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleMockLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace("/(tabs)/profile");
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
      console.log("Código recibido:", code);

      exchangeCodeForToken(code)
        .then((token) => {
          setAccessToken(token);
          console.log("Autenticación exitosa. Token:", token);

          // Aquí rediriges a la pantalla inicial o cierras el modal
          navigation.replace("/(tabs)/profile");
        })
        .catch((error) => {
          console.error("Error en el intercambio del token:", error);
          Alert.alert("Error", "No se pudo completar la autenticación.");
        });
    }
  }, [response, navigation]); // Añadir navigation a las dependencias

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

  const handleRealLogin = () => {
    // Aquí irá tu lógica de login real con Strava
    console.log("Iniciando autenticación real...");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <View style={styles.logoContainer}>
        <LogoSVG />
      </View>

      <Text style={[styles.title, { color: Colors[theme].text }]}>
        ¡Bienvenido a VertRun!
      </Text>
      <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
        Elige cómo iniciar sesión
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors[theme].tint} />
      ) : (
        <View style={styles.buttonContainer}>
          <Link href="/(tabs)/profile">
            <Button title="Log In (Mock)" onPress={handleMockLogin} />
          </Link>
          <Text style={[styles.smallText, { color: Colors[theme].text }]}>
            Para pruebas
          </Text>
          <Button
            title="Log In con Strava"
            onPress={() => {
              console.log("Iniciando autenticación...");
              promptAsync();
            }}
          />

          {/* <Button title="Log In con Strava" onPress={handleRealLogin} /> */}
          <Text style={[styles.smallText, { color: Colors[theme].text }]}>
            Autenticación oficial
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  smallText: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 15,
  },
});
