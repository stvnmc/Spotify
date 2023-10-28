import React from "react";

const Song = ({ track }) => {
  return (
    <div className="song">
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
  );
};

export default Song;
