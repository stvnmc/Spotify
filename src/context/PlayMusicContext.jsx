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
  const [playState, setPlayState] = useState(null);
  const [playListState, setPlayListState] = useState({
    nameList: null,
    id: null,
    tracksId: null,
  });
  const [isPlaying, setIsPlaying] = useState(null);

  const saveIdList = (nameAction, trackId) => {
    console.log("saveIdList");

    setPlayListState((prevState) => ({
      ...prevState,
      nameList: nameAction,
    }));
    if (trackId === idPlayState) return getInfoPlay();
    setIsPlaying(false);
    console.log("isplay false");
    setIdPlayState(trackId);
  };

  const getInfoPlay = async () => {
    console.log("getInfoPlay");
    setIsPlaying(false);

    const res = await getInfoTrack(spotyCode, idPlayState);

    if (playState === null || res.id !== playState.id) {
      setPlayState(res);
    }

    const index = res.artists?.findIndex(
      (artist) => artist.id === playListState.id
    );

    const resTopTracks = await getArtistsTopTracks(
      spotyCode,
      res.artists[index === -1 ? 0 : index]?.id
    );

    const res2 = await getInfoAlbum(spotyCode, res.album.id);

    if (playListState.nameList === "albums") {
      if (res2.id !== playListState.id) {
        const newPlaylistInfo = {
          nameList: playListState.nameList,
          id:
            playListState.nameList === "albums"
              ? res2.id
              : res.artists[index]?.id,
          tracksId:
            playListState.nameList === "albums"
              ? res2.tracks?.items.map((track) => track.id)
              : resTopTracks.map((track) => track.id),
        };

        setPlayListState(newPlaylistInfo);
        const newPlaylistInfoJSON = JSON.stringify(newPlaylistInfo);
        localStorage.setItem("id_list_songs", newPlaylistInfoJSON);
      }
    }

    if (playListState.nameList === "artist") {
      if (res.artists[index]?.id !== playListState.id) {
        const newPlaylistInfo = {
          nameList: playListState.nameList,
          id:
            playListState.nameList === "albums"
              ? res2.id
              : res.artists[index]?.id,
          tracksId:
            playListState.nameList === "albums"
              ? res2.tracks?.items.map((track) => track.id)
              : resTopTracks.map((track) => track.id),
        };

        setPlayListState(newPlaylistInfo);
        const newPlaylistInfoJSON = JSON.stringify(newPlaylistInfo);
        localStorage.setItem("id_list_songs", newPlaylistInfoJSON);
      }
    }
  };

  const changePlayState = (action) => {
    console.log("changePlayState");
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
    console.log(id);
    if (id === "pause") {
      console.log("ok");
      return setIsPlaying(false);
    }
    if (idPlayState === id || idPlayState === null) {
      console.log("1");
      saveIdList(nameAction, id);
      setIsPlaying(!isPlaying);
    } else {
      console.log("2");

      const idExists = playListState.tracksId.includes(id);
      if (!idExists) {
        console.log("okkk");
        setIsPlaying(true);
        saveIdList(nameAction, id);
        return;
      }
      console.log("4");
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
  }, [idPlayState]);

  useEffect(() => {}, [isPlaying]);

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
      }}
    >
      {children}
    </PlayMusicContext.Provider>
  );
};
