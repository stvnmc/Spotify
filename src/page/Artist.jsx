import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import SongArtist from "../components/SongArtist";
import { BiPlay } from "react-icons/bi";
import { RiMoreLine } from "react-icons/ri";
import CartItemsArtis from "../components/CartItemsArtis";
import CartItemsAlbums from "../components/CartItemsAlbum";
import { usePlayMusic } from "../context/PlayMusicContext";
import { CgPlayPause } from "react-icons/cg";
import {
  getArtistsAlbums,
  getArtistsRelated,
  getArtistsTopTracks,
  getInfoArtist,
} from "../api/infoArtist";

const Artist = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { spotyCode, artists, tracks } = useSearch();

  const {
    saveIdList,
    isPlaying,
    playAlbum,
    idPlayState,
    playListState,
    setIdplayListState,
  } = usePlayMusic();

  const [isPlayingArtist, setIsPlayingArtist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [artistInfoPage, setArtistInfoPage] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [artistRelated, setArtistRelated] = useState(null);
  const [albums, setAlbums] = useState(null);

  const infoGetPageArtist = async () => {
    try {
      setLoading(true);
      const res = await getInfoArtist(spotyCode, id);
      setArtistInfoPage(res);
      const resTopTracks = await getArtistsTopTracks(spotyCode, id);
      setTopTracks(resTopTracks);
      const resArtistRelated = await getArtistsRelated(spotyCode, id);
      setArtistRelated(resArtistRelated);
      const resArtistAlbums = await getArtistsAlbums(spotyCode, id);
      setAlbums(resArtistAlbums);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    infoGetPageArtist();
    setIdplayListState(id);
  }, [id]);

  const redirectPage = async (site, id) => {
    try {
      await infoGetPageArtist(null);
      navigate(`/${site}/${id}`, { replace: true });
      await infoGetPageArtist();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id !== playListState.id) return setIsPlayingArtist(false);

    if (id === playListState.id) {
      setIsPlayingArtist(true);
      if (!isPlaying) {
        setIsPlayingArtist(false);
      }
    }
  }, [artists, isPlaying]);

  // render page PopularTracks , RelatedArtists,RelatedAlbums

  const PopularTracks = () => (
    <div className="popular">
      <label>Popular</label>
      <div className="tracks">
        {topTracks.map((track, i) => (
          <SongArtist
            key={track.id}
            track={track}
            saveIdList={saveIdList}
            isPlaying={isPlaying}
            idPlayState={idPlayState}
            i={i + 1}
          />
        ))}
      </div>
    </div>
  );

  const RelatedArtists = () => (
    <div className="contlist">
      <h1>Related Artists</h1>
      <div className="artis">
        {artistRelated.map((artist) => {
          return (
            <CartItemsArtis
              key={artist.id}
              redirectPage={redirectPage}
              artist={artist}
            />
          );
        })}
      </div>
    </div>
  );

  const RelatedAlbums = () => {
    return (
      <div className="contlist">
        <h1>Related Albums</h1>
        <div className="artis">
          {albums.map((album) => {
            return (
              <CartItemsAlbums
                key={album.id}
                redirectPage={redirectPage}
                album={album}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div
            className="contMainArtis adaptable-background"
            style={{ backgroundImage: `url(${artistInfoPage?.images[0].url})` }}
          >
            <h1>{artistInfoPage?.name}</h1>
            <h1>{artistInfoPage?.followers?.total} followers</h1>
          </div>
          <div className="play-like-more play-follow">
            <div className="play-music">
              {!isPlayingArtist ? (
                <BiPlay onClick={() => playAlbum("artist", tracks[0].id)} />
              ) : (
                <CgPlayPause onClick={() => playAlbum("artist", "pause")} />
              )}
            </div>
            <div className="follow center">
              <h1>follow</h1>
            </div>
            <div className="more center">
              <RiMoreLine />
            </div>
          </div>

          <PopularTracks />

          <RelatedAlbums />

          <RelatedArtists />
        </>
      )}
    </>
  );
};

export default Artist;
