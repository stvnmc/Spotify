import React from "react";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const Song = ({ track }) => {
  const { allDurationSong } = useTimeAndDate();

  React.useEffect(() => {
    allDurationSong(track.duration_ms);
  }, []);

  return (
    <div className="song">
      <div className="song-duration">
        <div className="number-song">
          <h1>{track.track_number}</h1>
        </div>
        <div>
          <h1>{track.name}</h1>
          <div>
            {track.artists[0].name}
            {track.artists[1] &&
              track.artists[1].name &&
              `, ${track.artists[1].name}`}
          </div>
        </div>
      </div>
      <div>
        <h1>{allDurationSong(track.duration_ms)}</h1>
      </div>
    </div>
  );
};

export default Song;
