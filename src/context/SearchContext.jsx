import React, { createContext, useContext, useState } from "react";
import { getAlbum, getArtist, getAudio, getTrack } from "../api/infoArtist";
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
  const [album, setAbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const [track, setTrack] = useState([]);
  const [inSong, setInfoSong] = useState([]);

  function saveDataToLocalStorage() {}

  const funcionSearch = async (nameId) => {
    if (nameId) {
      const resgetArtist = await getArtist(spotyCode, nameId);
      setArtist(resgetArtist);

      const resgetAlbum = await getAlbum(spotyCode, nameId);
      setAbum(resgetAlbum);

      const resGetTrack = await getTrack(spotyCode, nameId);
      setTrack(resGetTrack);

      saveDataToLocalStorage();
    } else {
      setArtist([]);
      setAbum([]);
      setTrack([]);
    }
  };

  async function infoGetAudio(nameId) {
    const resGetSong = await getAudio(spotyCode, nameId);
    setInfoSong(resGetSong);
  }

  return (
    <SearchContext.Provider
      value={{
        funcionSearch,
        album,
        artist,
        track,
        infoGetAudio,
        inSong,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
