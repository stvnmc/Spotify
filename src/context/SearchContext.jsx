import React, { createContext, useContext, useState } from "react";
import { getAlbum, getArtist } from "../api/infoArtist";
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

  const funcionSearch = async (nameId) => {
    if (nameId) {
      const resgetAlbum = await getAlbum(spotyCode, nameId);
      setAbum(resgetAlbum);

      const resgetArtist = await getArtist(spotyCode, nameId);
      setArtist(resgetArtist);
    }
  };

  return (
    <SearchContext.Provider value={{ funcionSearch, album, artist }}>
      {children}
    </SearchContext.Provider>
  );
};
