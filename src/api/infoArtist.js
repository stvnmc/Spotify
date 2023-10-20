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
    console.log(response.data.albums.items);
    return response.data.albums.items;
  } catch (error) {
    console.log('ok');
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
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
