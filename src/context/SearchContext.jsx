import React, { createContext, useContext, useState } from "react";
import { getInfoAlbum, getInfoSearch } from "../api/infoArtist";
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
  const { spotyCode } = useAuth();
  // search
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  // album
  const [infoAlbum, setInfoAlbum] = useState([]);

  function saveDataToLocalStorage() {}

  async function funcionSearch(value) {
    try {
      const res = await getInfoSearch(spotyCode, value);
      setAlbums(res.albums.items);
      setArtists(res.artists.items);
      const limitedTracks = await res.tracks.items.slice(0, 4);
      setTracks(limitedTracks);
    } catch (error) {
      setAlbums([]);
      setArtists([]);
      setTracks([]);
    }
  }

  async function infoGetAlbum(id) {
    const res = await getInfoAlbum(spotyCode, id);
    setInfoAlbum(res);
  }

  // esto es la infromacion que voy a pedir  solo esprecifcia mente para album la apgina

  return (
    <SearchContext.Provider
      value={{
        funcionSearch,
        spotyCode,
        artists,
        albums,
        tracks,
        infoGetAlbum,
        infoAlbum,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
