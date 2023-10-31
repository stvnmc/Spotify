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
    console.error("Error en la solicitud:", error);
    throw error;
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

    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getInfoArtistsSimilarAlbum = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums?limit=6`,
      config
    );
    return response.data.items;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getInfoArtist = async (accessToken, id) => {
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getArtistsTopTracks = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`,
      config
    );
    console.log(response.data.tracks);
    return response.data.tracks;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getArtistsRelated = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/related-artists?limit=8`,
      config
    );
    console.log(response.data.artists);
    return response.data.artists;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
