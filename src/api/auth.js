import axios from "axios";

const spotifyAuthUrl = "https://accounts.spotify.com/authorize";
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const redirectUri = "https://stvnmc.github.io/Spotify/";
const scope =
  "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";

export const redirectToSpotifyAuthorization = () => {
  const authorizationUrl = `${spotifyAuthUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  window.location.href = authorizationUrl;
};

export const autenticate = (spotyCode) => {
  try {
    const searchParams = new URLSearchParams({
      grant_type: "authorization_code",
      code: spotyCode,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    axios
      .post("https://accounts.spotify.com/api/token", searchParams)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
      });
  } catch (err) {
  }
};
