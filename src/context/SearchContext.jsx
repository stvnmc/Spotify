import React, { createContext, useContext, useState } from "react";
import {
  getArtistsRelated,
  getArtistsTopTracks,
  getInfoAlbum,
  getInfoArtist,
  getInfoArtistsSimilarAlbum,
  getInfoSearch,
} from "../api/infoArtist";
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
  const { lounge } = useAuth();

  // search
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artistRelated, setArtistRelated] = useState([]);

  // album
  const [infoAlbum, setInfoAlbum] = useState([]);
  const [loading, setLoading] = useState(true);

  // access token
  const spotyCode = localStorage.getItem("access_token");

  async function funcionSearch(value) {
    try {
      const res = await getInfoSearch(spotyCode, value);
      if (res === "The access token expired") {
        lounge();
      }
      setAlbums(res.albums.items);
      setArtists(res.artists.items);
      const limitedTracks = await res.tracks.items.slice(0, 4);
      setTracks(limitedTracks);
    } catch (error) {
      setAlbums([]);
      setArtists([]);
      setTracks([]);
    }
  }

  async function infoGetAlbum(id) {
    const res = await getInfoAlbum(spotyCode, id);
    if (res === "The access token expired") {
      lounge();
    }
    setInfoAlbum(res);
  }

  async function infoGetArtist(id) {
    const resArtist = await getInfoArtist(spotyCode, id);
    setArtists(resArtist);

    const resAlbum = await getInfoArtistsSimilarAlbum(spotyCode, id);
    setAlbums(resAlbum);

    const resArtistTopTrack = await getArtistsTopTracks(spotyCode, id);
    setTracks(resArtistTopTrack);

    const resArtistRelated = await getArtistsRelated(spotyCode, id);
    setArtistRelated(resArtistRelated);
  }

  return (
    <SearchContext.Provider
      value={{
        funcionSearch,
        spotyCode,
        artists,
        albums,
        tracks,
        artistRelated,
        infoGetAlbum,
        infoAlbum,
        infoGetArtist,
        loading,
        setLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
