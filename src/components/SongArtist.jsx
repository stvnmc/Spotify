import React from "react";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const SongArtist = ({ track, i }) => {
  const { allDurationSong } = useTimeAndDate();
  console.log(track);
  
  return (
    <div className="track">
      <div className="infoTrack">
        <div className="trackNumTime center">
          <h1>{i}</h1>
        </div>
        <div
          className="contImg adaptable-background"
          style={{ backgroundImage: `url(${track.album.images[2].url})` }}
        ></div>
        <div className="nameTrack">
          <h1>{track.name}</h1>
        </div>
      </div>
      <div className="trackNumTime">
        <h1>{allDurationSong("song", track.duration_ms)}</h1>
      </div>
    </div>
  );
};

export default SongArtist;
