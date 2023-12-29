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
  const [heart, setHiaHeart] = useState(false);

  useEffect(() => {
    const equal = tracksUserLibrary.tracksIds.some(
      (elemento) => elemento.id === track.id
    );

    setHiaHeart(equal);
  }, []);

  const isTrackPlaying = track.id === idPlayState && isPlaying;

  const renderContent = () => {
    if (hovered) {
      return isTrackPlaying ? (
        <CgPlayPause onClick={() => playAlbum("albums", "pause")} />
      ) : (
        <BiPlay
          name="tu-icono"
          onClick={() => saveIdList("albums", track.id)}
        />
      );
    } else if (track.id === idPlayState) {
      return !isTrackPlaying ? track.track_number : <BarsPlaySong />;
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
          {heart ? (
            <FaHeart
              className="save"
              onClick={() => deleteUserLibrary(track.id, "song")}
            />
          ) : hovered ? (
            <LiaHeart onClick={() => saveUserLibrary(track.id, "song")} />
          ) : (
            ""
          )}
        </div>
        <div className="trackNumTime">
          {allDurationSong("song", track.duration_ms)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : ""}</div>
      </div>
    </div>
  );
};

export default Song;
