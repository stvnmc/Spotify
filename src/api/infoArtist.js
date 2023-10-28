import axios from "axios";

export const getInfoSearch = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        id
      )}&type=album,artist,track,playlist&limit=8`,

      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInfoAlbum = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      config
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInfoArtists = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
