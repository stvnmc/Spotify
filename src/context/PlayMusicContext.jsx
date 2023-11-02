import { createContext, useContext, useState } from "react";

export const PlayMusicContext = createContext();

export const usePlayMusic = () => {
  const context = useContext(PlayMusicContext);

  if (!context) {
    console.error("useSearch must be used within a SearchProvider");
  }

  return context;
};

export const PlayMusicProvider = ({ children }) => {


  
  return (
    <PlayMusicContext.Provider value={{}}>{children}</PlayMusicContext.Provider>
  );
};
