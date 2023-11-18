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
    console.error(error.response.data.error.message);
    return error.response.data.error.message;
    // return error;
    // throw error;
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
    return error.response.data.error.message;
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
    // console.log(response.data.artists.slice(0, 8));
    getArtistsRelatedd(accessToken);
    return response.data.artists.slice(0, 8);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getArtistsRelatedd = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const ressss = await axios.get(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      config
    );
    console.log(ressss);
    // console.log(response.data.artists.slice(0, 8));
    return ressss;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
