import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInfoAlbum } from "../api/infoArtist";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { RiMoreLine } from "react-icons/ri";
import { HiOutlineClock } from "react-icons/hi";
import SongAlbum from "../components/SongAlbum";
import CartItemsAlbum from "../components/CartItemsAlbum";
import { useTimeAndDate } from "../context/TimeAndDateContext";
import { usePlayMusic } from "../context/PlayMusicContext";
import { CgPlayPause } from "react-icons/cg";
import { useSearch } from "../context/SearchContext";

const Album = () => {
  const { spotyCode, infoGetArtist, artists, albums } = useSearch();
  const {
    saveIdList,
    isPlaying,
    playAlbum,
    idPlayState,
    playListState,
    playState,
  } = usePlayMusic();
  const { allDurationSong } = useTimeAndDate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [totalDurationAlbum, setTotalDurationAlbum] = useState(0);
  const [isPlayingAlbum, setIsPlayingAlbum] = useState(false);
  const [albuminfoPage, setAlbuminfoPage] = useState(null);

  const navigate = useNavigate();

  const calculateTotalDuration = (tracks) => {
    return tracks.reduce((total, track) => total + track.duration_ms, 0);
  };

  const infoGetPageAlbum = async () => {
    try {
      setLoading(true);
      const res = await getInfoAlbum(spotyCode, id);
      setAlbuminfoPage(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const infoGetPageArtist = async () => {
    if (albuminfoPage?.tracks) {
      const totalDuration = calculateTotalDuration(albuminfoPage.tracks.items);
      setTotalDurationAlbum(totalDuration);

      infoGetArtist(albuminfoPage.artists[0].id);
    }
  };

  useEffect(() => {
    console.log("cambia valore");
    if (id !== playListState.id) {
      console.log("no es igual");
      setIsPlayingAlbum(false);
      if (isPlaying) {
        console.log("se re produce");
        setIsPlayingAlbum(false);
      }
      return;
    }

    if (id === playListState.id) {
      console.log("es igual ");
      setIsPlayingAlbum(true);
      if (!isPlaying) {
        setIsPlayingAlbum(false);
      }
    }
  }, [albuminfoPage, isPlaying, playState]);

  useEffect(() => {
    infoGetPageAlbum();
  }, [id]);

  useEffect(() => {
    if (albuminfoPage) {
      infoGetPageArtist();
    }
  }, [albuminfoPage]);

  const redirectPage = async (site, id) => {
    try {
      await setAlbuminfoPage(null);
      navigate(`/${site}/${id}`, { replace: true });
      await infoGetPageAlbum();
      await infoGetPageArtist();
    } catch (error) {
      console.error(error);
    }
  };

  // content Page Album

  const AlbumInfo = () => {
    return (
      <div className="front-album">
        <div
          className="album-img-main adaptable-background"
          style={{
            backgroundImage: `url(${albuminfoPage?.images?.[1]?.url || ""})`,
          }}
        ></div>
        <div className="info-album">
          <h1>Album</h1>
          <h1>{albuminfoPage?.name}</h1>
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
                <h1>{albuminfoPage?.release_date}</h1>
                <div className="point"></div>
                <h1>
                  {albuminfoPage?.tracks?.items?.length || 0} songs,{" "}
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
        {albuminfoPage?.tracks?.items?.map((track) => (
          <SongAlbum
            key={track.id}
            track={track}
            redirectPage={redirectPage}
            saveIdList={saveIdList}
            allDurationSong={allDurationSong}
            idPlayState={idPlayState}
            isPlaying={isPlaying}
            playAlbum={playAlbum}
          />
        ))}

        <div className="credits">
          {albuminfoPage?.copyrights?.map((copyright, index) => (
            <h1 key={index}>{copyright.text}</h1>
          ))}
        </div>
      </div>
    );
  };

  const AlbumsSimilar = () => {
    return (
      <div className="moreSimilar">
        {albums.length > 0 && (
          <div className="moreSimilar">
            <div className="list">
              <h1>More of the {albuminfoPage?.artists?.[0]?.name}</h1>
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
                {!isPlayingAlbum ? (
                  <BiPlay
                    onClick={() =>
                      playAlbum("albums", albuminfoPage.tracks.items[0].id)
                    }
                  />
                ) : (
                  <CgPlayPause onClick={() => playAlbum("albums", "pause")} />
                )}
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
