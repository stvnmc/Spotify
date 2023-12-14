import React, { useEffect, useState } from "react";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { RiMoreLine } from "react-icons/ri";
import { useTimeAndDate } from "../../context/TimeAndDateContext";
import BarsPlaySong from "../animation/BarsPlaySong";
import { CgPlayPause } from "react-icons/cg";
import { useSerLibrary } from "../../context/UserLibraryContext";

const SongArtist = ({
  track,
  i,
  saveIdList,
  idPlayState,
  isPlaying,
  playAlbum,
}) => {
  const { allDurationSong } = useTimeAndDate();
  const { saveUserLibrary, tracksUserLibrary, deleteUserLibrary } =
    useSerLibrary();

  const [hovered, setHovered] = useState(false);
  const [heart, setHiaHeart] = useState(false);

  useEffect(() => {
    const equal = tracksUserLibrary.tracksIds.some(
      (elemento) => elemento.id === track.id
    );

    setHiaHeart(equal);
  }, [tracksUserLibrary]);

  const isTrackPlaying = track.id === idPlayState && isPlaying;

  const renderContent = () => {
    if (hovered) {
      return isTrackPlaying ? (
        <CgPlayPause onClick={() => playAlbum("artist", "pause")} />
      ) : (
        <BiPlay
          name="tu-icono"
          onClick={() => saveIdList("artist", track.id)}
        />
      );
    } else if (track.id === idPlayState) {
      return !isTrackPlaying ? i : <BarsPlaySong />;
    }

    return i;
  };

  return (
    <div
      className={`track ${track.id === idPlayState ? "hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={() => saveIdList("albums", track.id)}
    >
      <div className="infoTrack">
        <div
          className="trackNumTime center"
          onClick={() => saveIdList("artist", track.id)}
        >
          {renderContent()}
        </div>
        <div
          className="contImg adaptable-background"
          style={{ backgroundImage: `url(${track.album.images[2].url})` }}
        ></div>
        <div className="nameTrack">
          <h1>{track.name}</h1>
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

export default SongArtist;
