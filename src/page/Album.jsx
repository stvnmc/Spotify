import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { RiMoreLine } from "react-icons/ri";
import { HiOutlineClock } from "react-icons/hi";
import Song from "../components/Song";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const Album = () => {
  const { infoGetAlbum, infoAlbum, funcionSearch, artists } = useSearch();
  const { allDurationSong } = useTimeAndDate();

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [totalDurationAlbum, setTotalDurationAlbum] = useState(0);

  async function infoGetPageAlbum() {
    try {
      await infoGetAlbum(id);
      if (infoAlbum && infoAlbum.artists && infoAlbum.artists.length > 0) {
        await funcionSearch(infoAlbum.artists[0].name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const calculateTotalDuration = (tracks) => {
    return tracks.reduce((total, track) => total + track.duration_ms, 0);
  };

  useEffect(() => {
    infoGetPageAlbum();
  }, []);

  useEffect(() => {
    if (infoAlbum && infoAlbum.tracks) {
      const totalDuration = calculateTotalDuration(infoAlbum.tracks.items);
      setTotalDurationAlbum(totalDuration);
      console.log(totalDuration);
    }
  }, [infoAlbum]);

  return (
    <section className="sectionAlbum">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="front-album">
            <div
              className="album-img-main"
              style={{ backgroundImage: `url(${infoAlbum.images[1].url})` }}
            ></div>
            <div className="info-album">
              <h1>Album</h1>
              <h1>{infoAlbum.name}</h1>
              <div className="artis-date-songs">
                {artists && artists[0] && artists[0].images && (
                  <div
                    className="artist-img"
                    style={{
                      backgroundImage: `url(${artists[0].images[0].url})`,
                    }}
                  ></div>
                )}

                <h1>{infoAlbum.artists[0].name}</h1>
                <div className="point"></div>
                <h1>{infoAlbum.release_date}</h1>
                <div className="point"></div>
                <h1>
                  {infoAlbum.tracks.items.length} songs,{" "}
                  {allDurationSong(totalDurationAlbum)}
                </h1>
              </div>
            </div>
          </div>
          <div className="cont-list-music">
            <div className="play-like-more">
              <div className="play-music">
                <BiPlay />
              </div>
              <div className="like-more">
                <LiaHeart />
                <RiMoreLine />
              </div>
            </div>
            <div className="list-songs">
              <div className="title-clock">
                <div className="title">
                  <h1>#</h1>
                  <h1>Title</h1>
                </div>
                <HiOutlineClock />
              </div>
              <div className="line"></div>
              {infoAlbum.tracks.items.map((track) => {
                return <Song key={track.id} track={track} />;
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Album;
