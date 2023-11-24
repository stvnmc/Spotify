import { createContext, useContext, useEffect, useState } from "react";
import { useSearch } from "./SearchContext";
import { getInfoAlbum, getInfoTrack } from "../api/infoArtist";

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

  const [playListState, setPlayListState] = useState({
    id: null,
    tracksId: null,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const saveIdList = (trackId) => {
    setIsPlaying(true);
    if (trackId === idPlayState) return getInfoPlay();
    setIdPlayState(trackId);
  };

  const getInfoPlay = async () => {
    const res = await getInfoTrack(spotyCode, idPlayState);
    setPlayState(res);
    if (res.album?.id !== playListState.id) {
      getInfoListPlay(res.album?.id);
    }
  };

  const getInfoListPlay = async (id) => {
    const res = await getInfoAlbum(spotyCode, id);

    setPlayListState((prevState) => ({
      ...prevState,
      id: res.id,
      tracksId: res.tracks?.items.map((track) => track.id),
    }));
  };

  const changePlayState = (action) => {
    const position = playListState.tracksId.indexOf(idPlayState);
    const numList = playListState.tracksId.length;

    const actions = {
      next: () => {
        setIdPlayState(playListState.tracksId[(position + 1) % numList]);
      },
      back: () => {
        setIdPlayState(
          playListState.tracksId[(position - 1 + numList) % numList]
        );
      },
    };

    const selectedAction = actions[action];
    if (selectedAction) {
      selectedAction();
    }
  };

  const playAlbum = (id) => {
    if (idPlayState === id) {
      saveIdList(id);
    }
    if (id === "pause") {
      console.log("ok")
      return setIsPlaying(false);
    }
    setIsPlaying(!isPlaying);
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
      value={{
        saveIdList,
        playState,
        isPlaying,
        setIsPlaying,
        changePlayState,
        playAlbum,
        idPlayState,
      }}
    >
      {children}
    </PlayMusicContext.Provider>
  );
};
