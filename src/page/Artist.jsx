import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import SongArtist from "../components/songs/SongArtist";
import { BiPlay } from "react-icons/bi";
import { RiMoreLine } from "react-icons/ri";
import CartItemsArtis from "../components/CartItemsArtis";
import CartItemsAlbums from "../components/CartItemsAlbum";
import { usePlayMusic } from "../context/PlayMusicContext";
import { CgPlayPause } from "react-icons/cg";
import ColorThief from "colorthief";
import {
  getArtistsAlbums,
  getArtistsRelated,
  getArtistsTopTracks,
  getInfoArtist,
} from "../api/infoArtist";
import { useSerLibrary } from "../context/UserLibraryContext";
import Loading from "./Loading";

const Artist = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { spotyCode } = useSearch();

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

  // save list user
  const { saveUserLibrary, tracksUserLibrary, deleteUserLibrary } =
    useSerLibrary();

  const [follow, setFollow] = useState(false);

  const chanceSaveList = () => {
    const equal = tracksUserLibrary.albumsArtistIds.some(
      (elemento) => elemento.id === id
    );

    setFollow(equal);
  };

  useEffect(() => {
    chanceSaveList();
  }, [tracksUserLibrary]);

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
    chanceSaveList();
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
  }, [artistInfoPage, isPlaying]);

  // color
  const imageUrl = artistInfoPage?.images?.[0]?.url;
  const [backgroundColor, setBackgroundColor] = useState("rgba(0, 0, 0, 1)");
  const [backgroudGrandient, setBackgroudGrandient] =
    useState("rgba(0, 0, 0, 1)");

  useEffect(() => {
    const coloImg = async () => {
      if (imageUrl) {
        try {
          const imgBlob = await loadImageAsBlob(imageUrl);
          const img = new Image();
          img.src = URL.createObjectURL(imgBlob);

          img.addEventListener("load", () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);

            const rgbaColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
            const rgbaGrand = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 70%)`;

            setBackgroundColor(rgbaColor);
            setBackgroudGrandient(rgbaGrand);
          });
        } catch (error) {
          console.error("Error al cargar la imagen", error);
        }
      }
    };

    coloImg();
  }, [imageUrl]);

  const loadImageAsBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

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
        <Loading />
      ) : (
        <>
          <div
            className="contMainArtis"
            style={{
              backgroundColor,
            }}
          >
            <div
              className="adaptable-background img"
              style={{
                backgroundImage: `url(${artistInfoPage?.images[0].url})`,
              }}
            ></div>
            <div className="infoArtistName">
              <h1>{artistInfoPage?.name}</h1>
              <h1>
                {artistInfoPage?.followers?.total.toLocaleString()} Followers
              </h1>

              <h1>
                <span>Genres : </span>
                {artistInfoPage.genres.join(", ")}
              </h1>
            </div>
          </div>

          <div className="play-like-more play-follow">
            <div
              className="gradient"
              style={{
                background: `linear-gradient(to bottom,${backgroudGrandient},rgba(19, 19, 18) )`,
              }}
            ></div>
            <div className="play-music">
              {!isPlayingArtist ? (
                <BiPlay onClick={() => playAlbum("artist", topTracks[0].id)} />
              ) : (
                <CgPlayPause onClick={() => playAlbum("artist", "pause")} />
              )}
            </div>
            {follow ? (
              <div
                className="follow center"
                onClick={() => deleteUserLibrary(id, "albumArtist")}
              >
                <h1>following</h1>
              </div>
            ) : (
              <div
                className="follow center"
                onClick={() => saveUserLibrary(id, "albumArtist")}
              >
                <h1>follow</h1>
              </div>
            )}
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
