import { createContext, useContext, useEffect, useState } from "react";

import {
  getArtistsTopTracks,
  getInfoAlbum,
  getInfoTrack,
} from "../api/infoArtist";
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
  const spotyCode = localStorage.getItem("access_token");

  const [idPlayState, setIdPlayState] = useState(null);

  const [playState, setPlayState] = useState(null);

  const [playListState, setPlayListState] = useState({
    nameList: null,
    id: null,
    tracksId: null,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const saveIdList = (nameAction, trackId) => {
    setPlayListState((prevState) => ({
      ...prevState,
      nameList: nameAction,
    }));
    setIsPlaying(true);
    if (trackId === idPlayState) return getInfoPlay(nameAction);
    setIdPlayState(trackId);
  };

  const getInfoPlay = async (nameAction) => {
    setPlayListState((prevState) => ({
      ...prevState,
      nameList: nameAction,
    }));

    const res = await getInfoTrack(spotyCode, idPlayState);
    setPlayState(res);

    // new

    const index = res.artists.findIndex(
      (artist) => artist.id === playListState.id
    );
    const resTopTracks = await getArtistsTopTracks(
      spotyCode,
      res.artists[index === -1 ? 0 : index]?.id
    );
    const res2 = await getInfoAlbum(spotyCode, res.album.id);

    const newPlaylistInfo = {
      nameList: playListState.nameList,
      id: playListState.nameList === "albums" ? res2.id : res.artists[0]?.id,
      tracksId:
        playListState.nameList === "albums"
          ? res2.tracks?.items.map((track) => track.id)
          : resTopTracks.map((track) => track.id),
    };
    setPlayListState(newPlaylistInfo);
    const newPlaylistInfoJSON = JSON.stringify(newPlaylistInfo);
    localStorage.setItem("id_list_songs", newPlaylistInfoJSON);
  };

  const changePlayState = (action) => {
    const position = playListState.tracksId.indexOf(idPlayState);
    const numList = playListState.tracksId.length;

    const newPosition =
      action === "next"
        ? (position + 1) % numList
        : (position - 1 + numList) % numList;

    console.log(playListState.tracksId);
    setIdPlayState(playListState.tracksId[newPosition]);
  };

  const playAlbum = (nameAction, id) => {
    if (idPlayState === id || idPlayState === null) {
      saveIdList(nameAction, id);
    } else if (id === "pause") {
      setIsPlaying(false);
    } else {
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
      getInfoPlay(playListState.nameList);
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
