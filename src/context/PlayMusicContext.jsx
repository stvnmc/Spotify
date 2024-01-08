import { createContext, useContext, useEffect, useState } from "react";
import {
  getArtistsTopTracks,
  getInfoAlbum,
  getInfoTrack,
} from "../api/infoArtist";
import { useSerLibrary } from "./UserLibraryContext";

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

  const { tracksUserLibrary } = useSerLibrary();

  const saveIdList = (nameAction, trackId) => {
    console.log("saveIDLis");
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
      console.log("entreooooo");
      const index = res.artists?.findIndex(
        (artist) => artist.id === idplayListState
      );
      console.log(index);

      if (index !== -1) {
        console.log(index);
        const resTopTracks = await getArtistsTopTracks(
          spotyCode,
          res.artists[index === -1 ? 0 : index]?.id
        );
        console.log(playListState.track);

        const equal = resTopTracks.every(
          (elemento, i) =>
            playListState.tracksId && elemento.id === playListState.tracksId[i]
        );

        console.log(index);
        console.log("comooo");

        if (!equal && res.artists[index]?.id !== playListState.id) {
          const newPlaylistInfo = {
            nameList: playListState.nameList,
            id: idplayListState,
            tracksId: resTopTracks.map((track) => track.id),
          };

          updatePlaylistInfo(newPlaylistInfo);
        }
      }
    }

    if (playListState.nameList === "collection") {
      console.log("entros");

      const newPlaylistInfo = {
        nameList: playListState.nameList,
        id: idplayListState,
        tracksId: tracksUserLibrary.tracksIds.map((track) => track.id),
      };

      updatePlaylistInfo(newPlaylistInfo);
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
    console.log(position);

    const newPosition =
      action === "next"
        ? (position + 1) % numList
        : (position - 1 + numList) % numList;

    setIdPlayState(playListState.tracksId[newPosition]);
  };

  const playAlbum = (nameAction, id) => {
    console.log("playAbum");
    console.log(nameAction);
    console.log(idPlayState);
    if (id === "pause") {
      return setIsPlaying(false);
    }
    if (idPlayState === id || idPlayState === null) {
      console.log("son iguales ");
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
      if (playListState.nameList !== nameAction) {
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
    console.log("se ejecuto el inicio de todo");

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