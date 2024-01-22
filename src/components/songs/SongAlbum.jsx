import React, { useEffect, useState } from "react";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { RiMoreLine } from "react-icons/ri";
import BarsPlaySong from "../animation/BarsPlaySong";
import { CgPlayPause } from "react-icons/cg";
import { useSerLibrary } from "../../context/UserLibraryContext";

const Song = ({
  track,
  redirectPage,
  saveIdList,
  allDurationSong,
  idPlayState,
  isPlaying,
  playAlbum,
}) => {
  const { saveUserLibrary, tracksUserLibrary, deleteUserLibrary } =
    useSerLibrary();

  const [hovered, setHovered] = useState(false);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    // Verifica si la canción está en la biblioteca del usuario
    const isTrackInLibrary = tracksUserLibrary.tracksIds.some(
      (elemento) => elemento.id === track.id
    );

    setHeart(isTrackInLibrary);
  }, [tracksUserLibrary]);

  const isTrackPlaying = track.id === idPlayState && isPlaying;

  const renderContent = () => {
    if (hovered) {
      return isTrackPlaying ? (
        <CgPlayPause onClick={() => playAlbum("albums", "pause")} />
      ) : (
        <BiPlay onClick={() => saveIdList("albums", track.id)} />
      );
    } else if (track.id === idPlayState) {
      return isTrackPlaying ? <BarsPlaySong /> : track.track_number;
    }

    return track.track_number;
  };

  return (
    <div
      className={`track ${track.id === idPlayState ? "hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={() => saveIdList("albums", track.id)}
    >
      <div className="song-duration">
        <div className="trackNumTime center">{renderContent()}</div>
        <div className="nameTrack">
          <h1>{track.name}</h1>
          <div className="track-artist">
            <h1>
              {/* Mapeo de artistas */}
              {track.artists.map((artist, index) => (
                <span key={artist.id}>
                  <span onClick={() => redirectPage("artist", artist.id)}>
                    {artist.name}
                  </span>
                  {index < track.artists.length - 1 && ", "}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className="track-right">
        <div className="track-icons">
          {/* Ícono del corazón para agregar o quitar de la biblioteca */}
          {heart ? (
            <FaHeart
              className="save"
              onClick={() => deleteUserLibrary(track.id, "song")}
            />
          ) : hovered ? (
            <LiaHeart onClick={() => saveUserLibrary(track.id, "song")} />
          ) : null}
        </div>
        <div className="trackNumTime">
          {/* Duración de la canción */}
          {allDurationSong("song", track.duration_ms)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : null}</div>
      </div>
    </div>
  );
};

export default Song;
