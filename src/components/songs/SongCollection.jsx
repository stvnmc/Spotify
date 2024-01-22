import React, { useEffect, useState } from "react";
import { useTimeAndDate } from "../../context/TimeAndDateContext";
import timeAgo from "../functions/TimeAgo";

// Icons
import { RiMoreLine } from "react-icons/ri";
import { LiaHeart } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { BiPlay } from "react-icons/bi";
import BarsPlaySong from "../animation/BarsPlaySong";
import { CgPlayPause } from "react-icons/cg";
import { useSerLibrary } from "../../context/UserLibraryContext";

function SongCollection({
  song,
  i,
  tracksIds,
  idPlayState,
  isPlaying,
  saveIdList,
  playAlbum,
  redirectPage,
}) {
  const { allDurationSong } = useTimeAndDate();
  const [hovered, setHovered] = useState(false);
  const [heart, setHeart] = useState(false);

  const { saveUserLibrary, tracksUserLibrary, deleteUserLibrary } =
    useSerLibrary();

  useEffect(() => {
    // Verifica si la canción está en la biblioteca del usuario
    const isTrackInLibrary = tracksUserLibrary.tracksIds.some(
      (elemento) => elemento.id === song.id
    );

    setHeart(isTrackInLibrary);
  }, [tracksUserLibrary]);

  const isTrackPlaying = song.id === idPlayState && isPlaying;

  const renderContent = () => {
    if (hovered) {
      return isTrackPlaying ? (
        <CgPlayPause onClick={() => playAlbum("collection", "pause")} />
      ) : (
        <BiPlay onClick={() => saveIdList("collection", song.id)} />
      );
    } else if (song.id === idPlayState) {
      return isTrackPlaying ? <BarsPlaySong /> : song.track_number;
    }

    return i;
  };

  return (
    <div
      className={`track collection ${song.id === idPlayState ? "hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={() => saveIdList("albums", song.id)}
    >
      <div className="infoTrack trackCollection">
        <div className="number center">{renderContent()}</div>
        <div
          className="ImgColletion adaptable-background"
          style={{
            backgroundImage: `url(${song.album.images[2].url || ""})`,
          }}
        ></div>
        <div className="collectionNameArtists">
          <h1>{song.name}</h1>
          <h1>
            {song.artists.map((artist, index) => (
              <span key={artist.id}>
                <span onClick={() => redirectPage("artist", artist.id)}>
                  {artist.name}
                </span>
                {index < song.artists.length - 1 && ", "}
              </span>
            ))}
          </h1>
        </div>
      </div>
      <div
        className="nameAlbum"
        onClick={() => redirectPage("album", song?.album?.id)}
      >
        <p>{song.album.name}</p>
      </div>
      <div className="timeAgo">
        <h1>{timeAgo(tracksIds?.dateAdded)}</h1>
      </div>
      <div className="track-right">
        <div className="track-icons">
          {/* Ícono del corazón para agregar o quitar de la biblioteca */}
          {heart ? (
            <FaHeart
              className="save"
              onClick={() => deleteUserLibrary(song.id, "song")}
            />
          ) : hovered ? (
            <LiaHeart onClick={() => saveUserLibrary(song.id, "song")} />
          ) : null}
        </div>
        <div className="trackNumTime">
          {/* Duración de la canción */}
          {allDurationSong("song", song.duration_ms)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : null}</div>
      </div>
    </div>
  );
}

export default SongCollection;

