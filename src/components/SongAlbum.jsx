import React, { useEffect, useState } from "react";

import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { RiMoreLine } from "react-icons/ri";

const Song = ({ track, redirectPage, saveIdList, allDurationSong }) => {
  // console.log(track);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    allDurationSong(track.duration_ms);
  }, []);

  return (
    <div
      className="track"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="song-duration">
        <div className="trackNumTime center" onClick={() => saveIdList(track.id)}>
          {hovered ? <BiPlay name="tu-icono" /> : track.track_number}
        </div>
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
