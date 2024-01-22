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

  // Estados locales para gestionar la reproducción de música
  const [idPlayState, setIdPlayState] = useState(null);
  const [idplayListState, setIdplayListState] = useState(null);
  const [playState, setPlayState] = useState(null);
  const [playListState, setPlayListState] = useState({
    nameList: null,
    tracksId: null,
  });
  const [isPlaying, setIsPlaying] = useState(null);

  const { tracksUserLibrary } = useSerLibrary();

  // Función para guardar el ID de la lista de reproducción y cambiar el estado de reproducción
  const saveIdList = (nameAction, trackId) => {
    setPlayListState((prevState) => ({
      ...prevState,
      nameList: nameAction,
    }));
    if (trackId === idPlayState) return getInfoPlay();
    setIsPlaying(false);
    setIdPlayState(trackId);
  };

  // Función para obtener información de la pista actual y actualizar la lista de reproducción
  const getInfoPlay = async () => {
    const res = await getInfoTrack(spotyCode, idPlayState);
    const res2 = await getInfoAlbum(spotyCode, res?.album?.id);

    if (playState === null || res.id !== playState.id) {
      setPlayState(res);
    }

    if (playListState.nameList === "albums" && res2.id !== playListState.id) {
      const newPlaylistInfo = {
        ...playListState,
        nameList: playListState.nameList,
        id: res?.album?.id,
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

        const equal = resTopTracks.every(
          (elemento, i) =>
            playListState.tracksId && elemento.id === playListState.tracksId[i]
        );

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
      const newPlaylistInfo = {
        nameList: playListState.nameList,
        id: idplayListState,
        tracksId: tracksUserLibrary.tracksIds.map((track) => track.id),
      };

      updatePlaylistInfo(newPlaylistInfo);
    }
  };

  // Función para actualizar la información de la lista de reproducción en el estado y almacenarla en localStorage
  const updatePlaylistInfo = (newInfo) => {
    setPlayListState(newInfo);
    const newPlaylistInfoJSON = JSON.stringify(newInfo);
    localStorage.setItem("id_list_songs", newPlaylistInfoJSON);
  };

  // Función para cambiar la pista en la lista de reproducción
  const changePlayState = (action) => {
    setIsPlaying(false);
    const position = playListState.tracksId.indexOf(idPlayState);
    const numList = playListState.tracksId.length;

    const newPosition =
      action === "next"
        ? (position + 1) % numList
        : (position - 1 + numList) % numList;

    setIdPlayState(playListState.tracksId[newPosition]);
  };

  // Función para reproducir un álbum o pausar la reproducción
  const playAlbum = (nameAction, id) => {
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
      if (playListState.nameList !== nameAction) {
        saveIdList(nameAction, id);
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Efectos para inicializar el estado de reproducción desde localStorage
  useEffect(() => {
    const idSong = localStorage.getItem("id_song");
    const idListSong = localStorage.getItem("id_list_songs");
    const newPlaylistInfoJSON = JSON.parse(idListSong);

    if (idSong) setIdPlayState(idSong);

    if (idListSong) setPlayListState(newPlaylistInfoJSON);
  }, []);

  // Efecto para guardar el ID de la pista actual en localStorage y obtener información sobre la pista
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
