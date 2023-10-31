import axios from "axios";

const spotifyAuthUrl = "https://accounts.spotify.com/authorize";
const clientId = "99294a112b704e1d834d96f6ff85d976";
const clientSecret = "6f486941aca24d64921fc599bf9fe7d6";
const redirectUri = "http://localhost:5173";
const scope =
  "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";

export const redirectToSpotifyAuthorization = () => {
  const authorizationUrl = `${spotifyAuthUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  window.location.href = authorizationUrl;
};

export const autenticate = (spotyCode) => {
  console.log("autenticate");
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
        localStorage.setItem("refresh_token", res.data.refresh_token);
      });
  } catch (err) {
    console.log(err);
  }
};

export const refreshToken = async () => {
  console.log("hi");

  const refreshToken = localStorage.getItem("refresh_token");
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  try {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      params
    );
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
