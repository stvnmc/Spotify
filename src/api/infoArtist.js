import axios from "axios";

export const getAlbum = async (accessToken, nameId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        nameId
      )}&type=album&limit=6`,
      config
    );
    return response.data.albums.items;
  } catch (error) {
    console.log("ok");
    console.log(error);
  }
};

export const getArtist = async (accessToken, nameId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        nameId
      )}&type=artist&limit=6`,
      config
    );
    return response.data.artists.items;
  } catch (error) {
    console.log(error);
  }
};

export const getTrack = async (accessToken, nameId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        nameId
      )}&type=track&limit=4`,
      config
    );
    return response.data.tracks.items;
  } catch (error) {
    console.log(error);
  }
};

export const getAudio = async (accessToken, nameId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/audio-features?ids=${nameId}`,
      config
    );

    return response.data.audio_features[0];
  } catch (error) {
    console.log(error);
  }
};
