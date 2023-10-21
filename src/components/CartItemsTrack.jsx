import React, { useEffect } from "react";
import { useSearch } from "../context/SearchContext";

const CartItemsTrack = ({ song }) => {
  const { infoGetAudio, inSong } = useSearch();
  let ms;
  if (inSong) ms = inSong.duration_ms;

  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);

  useEffect(() => {
    infoGetAudio(song.id);
  }, []);

  return (
    <div className="contSong">
      <div className="contImgText">
        <img src={song.album.images[2].url} />
        <div className="text">
          <h1>{song.name}</h1>
          {song.artists[1] ? (
            <>
              <h1>
                {song.artists[0].name}, {song.artists[1].name}
              </h1>
            </>
          ) : (
            <h1>{song.artists[0].name}</h1>
          )}
        </div>
      </div>
      <h1>
        {minutes}:{seconds}
      </h1>
    </div>
  );
};

export default CartItemsTrack;
