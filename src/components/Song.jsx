import React from "react";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const Song = ({ track, redirectPage, functionPlaybackState }) => {
  const { allDurationSong } = useTimeAndDate();

  React.useEffect(() => {
    allDurationSong(track.duration_ms);
  }, []);

  return (
    <div className="song">
      <div className="song-duration">
        <div className="number-song">
          <h1 onClick={() => functionPlaybackState(track.artists[0].preview_url)}> {track.track_number}</h1>
        </div>
        <div>
          <h1>{track.name}</h1>
          <div>
            <h1 onClick={() => redirectPage("artist", track.artists[0].id)}>
              {track.artists[0].name}
            </h1>
            {track.artists[1] && track.artists[1].name && (
              <h1 onClick={() => redirectPage("artist", track.artists[1].id)}>
                {`, ${track.artists[1].name}`}
              </h1>
            )}
          </div>
        </div>
        
      </div>
      <div>
        <h1>{allDurationSong("song", track.duration_ms)}</h1>
      </div>
    </div>
  );
};

export default Song;
