import React, { useEffect, useState } from "react";
import { Button, Text, View, Alert } from "react-native";
import * as AuthSession from "expo-auth-session";

const clientId = "141567";
const clientSecret = "398a1d8b2b3d6e327db0aaf9bd788e4acec02b4f";
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

const HomeScreen = () => {
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
        })
        .catch((error) => {
          console.error("Error intercambiando el código:", error);
          Alert.alert("Error", "Hubo un problema durante la autenticación.");
        });
    }
  }, [response]);

  const exchangeCodeForToken = async (code: string): Promise<string> => {
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
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!accessToken ? (
        <Button
          title="Iniciar sesión con Strava"
          onPress={() => promptAsync()}
        />
      ) : (
        <Text>¡Bienvenido! Token de acceso: {accessToken}</Text>
      )}
    </View>
  );
};

export default HomeScreen;
