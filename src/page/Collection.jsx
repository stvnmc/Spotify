import React, { useEffect, useState } from "react";
// icons
import { AiFillHeart } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
// export componets
import { useSerLibrary } from "../context/UserLibraryContext";
import SongCollection from "../components/songs/SongCollection";
import { useSearch } from "../context/SearchContext";
import Login from "./Login";
import { usePlayMusic } from "../context/PlayMusicContext";

const Collection = () => {
  const { tracksUserLibrary } = useSerLibrary();
  const { tracksIds } = tracksUserLibrary;
  const { idPlayState, isPlaying, saveIdList } = usePlayMusic();

  const { infoPageColletion, loading, songsCollection, setSongsCollection } =
    useSearch();

  const collectionSongs = async () => {
    console.log("collectionSongs");
    const filteredSongsCollection = songsCollection.filter(
      (item) => !tracksIds?.some((album) => album.id === item.id)
    );

    setSongsCollection((prevState) =>
      prevState.filter((item) => item.id !== filteredSongsCollection[0]?.id)
    );

    for (const songs of tracksIds) {
      if (!songsCollection.some((res) => res.id === songs.id)) {
        infoPageColletion(songs.id);
      }
    }
  };

  useEffect(() => {
    collectionSongs();
  }, []);

  const Tracks = () => {
    return (
      <div className="list-songs">
        <div className="title-albumN-clock collectionTitle">
          <div className="title">
            <h1> #</h1>
            <h1> Title</h1>
          </div>
          <div className="albumN">
            <h1>Album</h1>
          </div>
          <div className="Date">
            <h1>Date added</h1>
          </div>
          <HiOutlineClock />
        </div>
        <div className="line"></div>
        {songsCollection.map((song, i) => {
          return (
            <SongCollection
              song={song}
              key={song.id}
              i={i + 1}
              tracksIds={tracksIds[i]}
              idPlayState={idPlayState}
              isPlaying={isPlaying}
              saveIdList={saveIdList}
            />
          );
        })}
      </div>
    );
  };

  if (!loading) return <Login />;

  return (
    <section>
      <div className="front-collection" style={{ backgroundColor: "#463287" }}>
        <div className="collection-img-main adaptable-background saveList">
          <AiFillHeart />
        </div>
        <div className="info-collection">
          <h1>List</h1>
          <h1>Songs you like</h1>
          <div className="collection-artis-date">
            <h1>userName</h1>
            <div className="point"></div>
            <h1>{tracksIds?.length} Songs</h1>
          </div>
        </div>
      </div>
      <div className="cont-list-music">
        <div
          className="gradient"
          style={{
            background: `linear-gradient(to bottom, rgba(70, 50, 135, 64%), rgba(19, 19, 18, 100%))`,
          }}
        ></div>
        <div className="play-like-more">
          <div className="play-music">
            <BiPlay />
          </div>
        </div>
        <Tracks />
      </div>
    </section>
  );
};

export default Collection;
