import { createContext, useContext, useEffect, useState } from "react";
import { useSearch } from "./SearchContext";
import { getInfoTrack } from "../api/infoArtist";

export const PlayMusicContext = createContext();

export const usePlayMusic = () => {
  const context = useContext(PlayMusicContext);

  if (!context) {
    console.error("useSearch must be used within a SearchProvider");
  }

  return context;
};

export const PlayMusicProvider = ({ children }) => {
  const {} = useSearch();
  const spotyCode = localStorage.getItem("access_token");
  const idSong = localStorage.getItem("id_song");

  const [idPlayState, setIdPlayState] = useState(null);

  const [playState, setPlayState] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const saveIdList = (track) => {
    setIdPlayState(track);
    setIsPlaying(true);
  };

  const getInfoPlay = async () => {
    const res = await getInfoTrack(spotyCode, idPlayState);
    setPlayState(res);
  };

  useEffect(() => {
    if (idSong) {
      setIdPlayState(idSong);
    }
  }, []);

  useEffect(() => {
    if (idPlayState) {
      localStorage.setItem("id_song", idPlayState);
    }
    if (idPlayState !== null) {
      getInfoPlay();
    }
  }, [idPlayState]);

  return (
    <PlayMusicContext.Provider
      value={{ saveIdList, playState, isPlaying, setIsPlaying }}
    >
      {children}
    </PlayMusicContext.Provider>
  );
};
