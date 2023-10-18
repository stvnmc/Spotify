export const redirectToSpotifyAuthorization = () => {
  const spotifyAuthUrl = "https://accounts.spotify.com/authorize";
  const clientId = "6792122c1da44db88cde4d0a94b2d787";
  const redirectUri = encodeURIComponent("http://localhost:5173");
  const scope = encodeURIComponent(
    "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state"
  );

  const authorizationUrl = `${spotifyAuthUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  window.location.href = authorizationUrl;
};
