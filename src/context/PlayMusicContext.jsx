import { createContext, useContext, useEffect, useState } from "react";
import {
  getArtistsTopTracks,
  getInfoAlbum,
  getInfoTrack,
} from "../api/infoArtist";

export const PlayMusicContext = createContext();

export const usePlayMusic = () => {
  const context = useContext(PlayMusicContext);

  if (!context) {
    console.error(
      "usePlayMusic debe ser utilizado dentro de un PlayMusicProvider"
    );
  }

  return context;
};

export const PlayMusicProvider = ({ children }) => {
  const spotyCode = localStorage.getItem("access_token");

  const [idPlayState, setIdPlayState] = useState(null);
  const [idplayListState, setIdplayListState] = useState(null);
  const [playState, setPlayState] = useState(null);
  const [playListState, setPlayListState] = useState({
    nameList: null,
    tracksId: null,
  });
  const [isPlaying, setIsPlaying] = useState(null);

  const saveIdList = (nameAction, trackId) => {
    console.log("saveIDLis");
    console.log(nameAction);
    console.log(trackId);
    setPlayListState((prevState) => ({
      ...prevState,
      nameList: nameAction,
    }));
    if (trackId === idPlayState) return getInfoPlay();
    setIsPlaying(false);
    setIdPlayState(trackId);
  };

  const getInfoPlay = async () => {
    console.log("getINfo");
    console.log(playListState);

    const res = await getInfoTrack(spotyCode, idPlayState);
    const res2 = await getInfoAlbum(spotyCode, res?.album?.id);

    if (playState === null || res.id !== playState.id) {
      setPlayState(res);
    }

    if (playListState.nameList === "albums" && res2.id !== playListState.id) {
      const newPlaylistInfo = {
        ...playListState,
        nameList: playListState.nameList,
        id: idplayListState,
        tracksId: res2.tracks?.items.map((track) => track.id),
      };

      updatePlaylistInfo(newPlaylistInfo);
      return;
    }

    if (playListState.nameList === "artist") {
      const index = res.artists?.findIndex(
        (artist) => artist.id === idplayListState
      );

      if (index !== -1) {
        const resTopTracks = await getArtistsTopTracks(
          spotyCode,
          res.artists[index === -1 ? 0 : index]?.id
        );

        const equal = resTopTracks.some(
          (elemento, i) => elemento.id === playListState.tracksId[i]
        );

        if (!equal && res.artists[index]?.id !== playListState.id) {
          console.log("entros");
          console.log(idplayListState);
          const newPlaylistInfo = {
            nameList: playListState.nameList,
            id: idplayListState,
            tracksId: resTopTracks.map((track) => track.id),
          };

          updatePlaylistInfo(newPlaylistInfo);
        }
      }
    }

    if(playListState.nameList === "collection"){
      console.log("okokoko")
    }
  };

  const updatePlaylistInfo = (newInfo) => {
    setPlayListState(newInfo);
    const newPlaylistInfoJSON = JSON.stringify(newInfo);
    localStorage.setItem("id_list_songs", newPlaylistInfoJSON);
  };

  const changePlayState = (action) => {
    console.log("changePlayState");
    setIsPlaying(false);
    const position = playListState.tracksId.indexOf(idPlayState);
    const numList = playListState.tracksId.length;

    const newPosition =
      action === "next"
        ? (position + 1) % numList
        : (position - 1 + numList) % numList;

    setIdPlayState(playListState.tracksId[newPosition]);
  };

  const playAlbum = (nameAction, id) => {
    console.log("playAlbum");
    console.log(nameAction);
    console.log(id);
    if (id === "pause") {
      return setIsPlaying(false);
    }
    if (idPlayState === id || idPlayState === null) {
      saveIdList(nameAction, id);
      setIsPlaying(!isPlaying);
    } else {
      const idExists = playListState.tracksId?.includes(id);
      if (!idExists) {
        setIsPlaying(true);
        saveIdList(nameAction, id);
        return;
      }
      if (idplayListState !== playListState.id) {
        saveIdList(nameAction, id);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const idSong = localStorage.getItem("id_song");
    const idListSong = localStorage.getItem("id_list_songs");
    const newPlaylistInfoJSON = JSON.parse(idListSong);

    if (idSong) setIdPlayState(idSong);

    if (idListSong) setPlayListState(newPlaylistInfoJSON);
  }, []);

  useEffect(() => {
    if (idPlayState) {
      localStorage.setItem("id_song", idPlayState);
      getInfoPlay();
    }
  }, [idPlayState, idplayListState]);

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
        playListState,
        getInfoPlay,
        setIdplayListState,
      }}
    >
      {children}
    </PlayMusicContext.Provider>
  );
};
