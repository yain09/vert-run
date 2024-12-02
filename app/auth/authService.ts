// Archivo: app/auth/authService.ts

import axios from 'axios';

export const loginWithStrava = async (code: string) => {
  const clientId = '141567';  // Tu client_id de Strava
  const clientSecret = '398a1d8b2b3d6e327db0aaf9bd788e4acec02b4f';  // Tu client_secret de Strava
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true }); // La misma URI de redirección

  try {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    if (response.data.access_token) {
      return response.data.access_token; // Devuelve el token de acceso
    } else {
      throw new Error('No se recibió el token de acceso');
    }
  } catch (error) {
    console.error("Error durante la solicitud de token:", error);
    throw error;
  }
};
