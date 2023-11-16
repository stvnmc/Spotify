import React, { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { RiMoreLine } from "react-icons/ri";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const SongArtist = ({ track, i }) => {
  const { allDurationSong } = useTimeAndDate();
  console.log(track);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="track"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="infoTrack">
        <div className="trackNumTime center">
          {hovered ? <BiPlay name="tu-icono" /> : i}
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
        <div className="track-icons">{hovered ? <LiaHeart /> : ""}</div>
        <div className="trackNumTime">
          {allDurationSong("song", track.duration_ms)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : ""}</div>
      </div>
    </div>
  );
};

export default SongArtist;
