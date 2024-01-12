import axios from "axios";

function lounge() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("spotifyCode");
  window.location.reload();
}

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
    if (error.response.data.error.message === "The access token expired") {
      lounge();
    }
    return error.response.data.error.message;
  }
};

export const getInfoTrack = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,

      config
    );
    return response.data;
  } catch (error) {
   
    if (error.response.data.error?.message === "The access token expired") {
      lounge();
    }
    return error.response;
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
    console.log(error)
    if (error.response.data.error.message === "The access token expired") {
      lounge();
    }
    return error.response.status;
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
    if (error.response.data.error.message === "The access token expired") {
      lounge();
    }
    return error.response.data.error.message;
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
    console.log(error)
    if (error.response.data.error.message === "The access token expired") {
      lounge();
    }
    return error.response.status;
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
    // console.log(response.data.tracks);
    return response.data.tracks;
  } catch (error) {
    if (error.response.data.error.message === "The access token expired") {
      lounge();
    }
    return error.response.data.error.message;
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
    return response.data.artists.slice(0, 8);
  } catch (error) {
    if (error.response.data.error.message === "The access token expired") {
      lounge();
    }
    return error.response.data.error.message;
  }
};

export const getArtistsAlbums = async (accessToken, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      config
    );

    return response.data.items.slice(0, 8);
  } catch (error) {
    if (error.response.data.error.message === "The access token expired") {
      lounge();
    }
    return error.response.data.error.message;
  }
};
