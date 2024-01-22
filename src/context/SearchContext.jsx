import React, { createContext, useContext, useState } from "react";
import {
  getArtistsRelated,
  getArtistsTopTracks,
  getInfoAlbum,
  getInfoArtist,
  getInfoArtistsSimilarAlbum,
  getInfoSearch,
  getInfoTrack,
} from "../api/infoArtist";
import { useAuth } from "./AuthContext";

export const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    console.error("useSearch must be used within a SearchProvider");
  }

  return context;
};

export const SearchProvider = ({ children }) => {
  const { lounge } = useAuth();

  // Estado para almacenar la información de la búsqueda
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artistRelated, setArtistRelated] = useState([]);

  // Estado para almacenar la información de un álbum específico
  const [infoAlbum, setInfoAlbum] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estado para almacenar canciones en una colección
  const [songsCollection, setSongsCollection] = useState([]);

  // Obtener el código de acceso de Spotify desde el almacenamiento local
  const spotyCode = localStorage.getItem("access_token");

  // Función para realizar una búsqueda
  async function funcionSearch(value) {
    try {
      setLoading(true);
      const res = await getInfoSearch(spotyCode, value);
      if (res === "The access token expired") {
        lounge();
      }
      setAlbums(res.albums.items);
      setArtists(res.artists.items);
      const limitedTracks = await res.tracks.items.slice(0, 4);
      setTracks(limitedTracks);
    } catch (error) {
      setAlbums([]);
      setArtists([]);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }

  // Función para obtener información detallada de un álbum
  async function infoGetAlbum(id) {
    const res = await getInfoAlbum(spotyCode, id);
    setInfoAlbum(res);
  }

  // Función para obtener información detallada de un artista y sus elementos relacionados
  async function infoGetArtist(id) {
    const resArtist = await getInfoArtist(spotyCode, id);
    setArtists(resArtist);

    const resAlbum = await getInfoArtistsSimilarAlbum(spotyCode, id);
    setAlbums(resAlbum);

    const resArtistTopTrack = await getArtistsTopTracks(spotyCode, id);
    setTracks(resArtistTopTrack);

    const resArtistRelated = await getArtistsRelated(spotyCode, id);
    setArtistRelated(resArtistRelated);
  }

  // Función para obtener información detallada de una pista y agregarla a la colección
  async function infoPageColletion(id) {
    try {
      setLoading(true);
      const res = await getInfoTrack(spotyCode, id);
      setSongsCollection((prevState) => [...prevState, res]);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Función para obtener información detallada de un elemento en el panel derecho de la página
  async function infoPageRightPanel(id) {
    const result = await getInfoAlbum(spotyCode, id);
    if (result !== 404) {
      return result;
    }

    const result1 = await getInfoArtist(spotyCode, id);
    if (result1 !== 404) {
      return result1;
    }
  }

  // Función para obtener información detallada de un elemento en la página principal
  async function infoPageHome(id) {
    const result = await getInfoAlbum(spotyCode, id);
    if (result !== 404) {
      return result;
    }

    const result1 = await getInfoArtist(spotyCode, id);
    if (result1 !== 404) {
      return result1;
    }
  }

  return (
    <SearchContext.Provider
      value={{
        funcionSearch,
        spotyCode,
        artists,
        albums,
        tracks,
        artistRelated,
        infoGetAlbum,
        infoAlbum,
        infoGetArtist,
        loading,
        setLoading,
        infoPageColletion,
        songsCollection,
        setSongsCollection,
        infoPageRightPanel,
        infoPageHome,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
