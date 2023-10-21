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
  const [album, setAbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [track, setTrack] = useState(null);
  const [inSong, setInfoSong] = useState(null);

  function saveDataToLocalStorage() {
    console.log("hola");
  }

  const funcionSearch = async (nameId) => {
    if (nameId) {
      const resgetAlbum = await getAlbum(spotyCode, nameId);
      setAbum(resgetAlbum);

      const resgetArtist = await getArtist(spotyCode, nameId);
      setArtist(resgetArtist);

      const resGetTrack = await getTrack(spotyCode, nameId);
      setTrack(resGetTrack);

      saveDataToLocalStorage();
    } else {
      setArtist(null);
      setAbum(null);
    }
  };

  async function infoGetAudio(nameId) {
    const resGetSong = await getAudio(spotyCode, nameId);
    setInfoSong(resGetSong);
  }

  return (
    <SearchContext.Provider
      value={{ funcionSearch, album, artist, track, infoGetAudio, inSong }}
    >
      {children}
    </SearchContext.Provider>
  );
};
