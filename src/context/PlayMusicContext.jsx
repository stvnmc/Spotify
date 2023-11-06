import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useSearch } from "./SearchContext";

export const PlayMusicContext = createContext();

export const usePlayMusic = () => {
  const context = useContext(PlayMusicContext);

  if (!context) {
    console.error("useSearch must be used within a SearchProvider");
  }

  return context;
};

export const PlayMusicProvider = ({ children }) => {
  const { spotyCode } = useAuth();

  const [playbackState, setPlaybackState] = useState([]);


  async function functionPlaybackState(audio) {
    try {
      await setPlaybackState(audio);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PlayMusicContext.Provider value={{ functionPlaybackState, playbackState }}>
      {children}
    </PlayMusicContext.Provider>
  );
};
