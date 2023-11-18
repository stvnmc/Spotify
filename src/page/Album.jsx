import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { RiMoreLine } from "react-icons/ri";
import { HiOutlineClock } from "react-icons/hi";
import SongAlbum from "../components/SongAlbum";
import CartItemsAlbum from "../components/CartItemsAlbum";
import { useTimeAndDate } from "../context/TimeAndDateContext";
import { usePlayMusic } from "../context/PlayMusicContext";

const Album = () => {
  const {
    infoGetAlbum,
    infoAlbum,
    infoGetArtist,
    artists,
    albums,
    loading,
    setLoading,
  } = useSearch();

  const { functionPlaybackState } = usePlayMusic();

  const { allDurationSong } = useTimeAndDate();
  const { id } = useParams();
  const [totalDurationAlbum, setTotalDurationAlbum] = useState(0);

  const navigate = useNavigate();

  const calculateTotalDuration = (tracks) => {
    return tracks.reduce((total, track) => total + track.duration_ms, 0);
  };

  const infoGetPageAlbum = async () => {
    try {
      await infoGetAlbum(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const infoGetPageArtist = async () => {
    if (infoAlbum.tracks) {
      const totalDuration = calculateTotalDuration(infoAlbum.tracks.items);
      setTotalDurationAlbum(totalDuration);

      infoGetArtist(infoAlbum.artists[0].id);
    }
  };

  useEffect(() => {
    infoGetPageAlbum();
  }, []);
  
  useEffect(() => {
    console.log(window.scrollY);
  }, []);

  useEffect(() => {
    infoGetPageArtist();
  }, [infoAlbum]);

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`, { replace: true });
    window.location.reload();
  };

  // content Page Album

  const AlbumInfo = () => {
    return (
      <div className="front-album">
        <div
          className="album-img-main adaptable-background"
          style={{
            backgroundImage: `url(${infoAlbum?.images?.[1]?.url || ""})`,
          }}
        ></div>
        <div className="info-album">
          <h1>Album</h1>
          <h1>{infoAlbum?.name}</h1>
          <div className="artis-date-songs">
            <div className="artis-info">
              <div
                className="artist-img adaptable-background"
                style={{
                  backgroundImage: `url(${artists?.images?.[0]?.url})`,
                }}
              ></div>
              <div className="artis-date">
                <h1 onClick={() => redirectPage("artist", artists?.id)}>
                  {artists?.name}
                </h1>

                <div className="point"></div>
                <h1>{infoAlbum?.release_date}</h1>
                <div className="point"></div>
                <h1>
                  {infoAlbum?.tracks?.items?.length || 0} songs,{" "}
                  {allDurationSong("infoAlbum", totalDurationAlbum)}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TracksAlbum = () => {
    return (
      <div className="list-songs">
        <div className="title-clock">
          <div className="title">
            <h1># Title</h1>
          </div>
          <HiOutlineClock />
        </div>
        <div className="line"></div>
        {infoAlbum?.tracks?.items?.map((track) => (
          <SongAlbum
            key={track.id}
            track={track}
            redirectPage={redirectPage}
            functionPlaybackState={functionPlaybackState}
          />
        ))}
        {infoAlbum?.copyrights && (
          <div className="credits">
            <h1>{infoAlbum?.copyrights?.[0]?.text}</h1>
            <h1>{infoAlbum?.copyrights?.[1]?.text}</h1>
          </div>
        )}
      </div>
    );
  };

  const AlbumsSimilar = () => {
    return (
      <div className="moreSimilar">
        {albums.length > 0 && (
          <div className="moreSimilar">
            <div className="list">
              <h1>More of the {infoAlbum?.artists?.[0]?.name}</h1>
              <div className="album">
                {albums.map((album, i) => (
                  <CartItemsAlbum
                    redirectPage={redirectPage}
                    album={album}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <AlbumInfo />
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
            <TracksAlbum />
          </div>
          <AlbumsSimilar />
        </>
      )}
    </section>
  );
};

export default Album;
