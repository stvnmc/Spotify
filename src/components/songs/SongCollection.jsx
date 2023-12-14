import React from "react";
import { useTimeAndDate } from "../../context/TimeAndDateContext";
import timeAgo from "../functions/TimeAgo";

function SongCollection({ song, i, tracksIds }) {
  const { allDurationSong } = useTimeAndDate();

  return (
    <div className="track">
      <div className="infoTrack">
        <h1>{i}</h1>
        <div
          className="ImgColletion adaptable-background"
          style={{
            backgroundImage: `url(${song.album.images[2].url || ""})`,
          }}
        ></div>
      </div>
      <div>
        <h1>{song.album.name}</h1>
      </div>
      <div>
        <h1>{timeAgo(tracksIds.dateAdded)}</h1>
      </div>
      <div>{allDurationSong("song", song.duration_ms)}</div>
    </div>
  );
}

export default SongCollection;
