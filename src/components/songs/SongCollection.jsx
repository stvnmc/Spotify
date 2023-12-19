import React from "react";
import { useTimeAndDate } from "../../context/TimeAndDateContext";
import timeAgo from "../functions/TimeAgo";

function SongCollection({ song, i, tracksIds }) {
  const { allDurationSong } = useTimeAndDate();
  console.log(song);

  return (
    <div className="track collection">
      <div className="infoTrack trackCollection">
        <div className="number">
          <h1>{i}</h1>
        </div>
        <div
          className="ImgColletion adaptable-background"
          style={{
            backgroundImage: `url(${song.album.images[2].url || ""})`,
          }}
        ></div>
        <div className="collectionNameArtists">
          <h1>{song.name}</h1>

          <h1>{song.artists.map((artist) => artist.name).join(", ")}</h1>
        </div>
      </div>
      <div className="nameAlbum">{song.album.name}</div>
      <div className="timeAgo">
        <h1>{timeAgo(tracksIds.dateAdded)}</h1>
      </div>
      <div>{allDurationSong("song", song.duration_ms)}</div>
    </div>
  );
}

export default SongCollection;
