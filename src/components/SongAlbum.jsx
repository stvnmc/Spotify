import React, { useEffect, useState } from "react";

import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { RiMoreLine } from "react-icons/ri";
import BarsPlaySong from "./animation/BarsPlaySong";
import { CgPlayPause } from "react-icons/cg";

const Song = ({
  track,
  redirectPage,
  saveIdList,
  allDurationSong,
  idPlayState,
  isPlaying,
  playAlbum,
}) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    allDurationSong(track.duration_ms);
  }, []);

  const isTrackPlaying = track.id === idPlayState && !isPlaying;

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
      return isTrackPlaying ? track.track_number : <BarsPlaySong />;
    }

    return track.track_number;
  };

  return (
    <div
      className={`track ${track.id === idPlayState ? "hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="song-duration">
        <div className="trackNumTime center">{renderContent()}</div>
        <div className="nameTrack">
          <h1>{track.name}</h1>
          <div className="track-artist">
            <h1>
              <span onClick={() => redirectPage("artist", track.artists[0].id)}>
                {track.artists[0].name}
              </span>
              {track.artists[1] && (
                <span
                  onClick={() => redirectPage("artist", track.artists[1].id)}
                >
                  {`, ${track.artists[1].name}`}
                </span>
              )}
            </h1>
          </div>
        </div>
      </div>
      <div className="track-right">
        <div className="track-icons">{hovered ? <LiaHeart /> : ""}</div>
        <div className="trackNumTime">
          {allDurationSong("song", track.duration_ms)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : ""}</div>
      </div>
    </div>
  );
};

export default Song;
