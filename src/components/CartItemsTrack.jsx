import React from "react";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const CartItemsTrack = ({ track }) => {
  const { textLimit } = useTimeAndDate();
  return (
    <div className="contSong">
      <div className="contImgText">
        <img src={track.album.images[2].url} />
        <div className="text">
          <h1>{textLimit("songs", track.name)}</h1>
          {track.artists[1] ? (
            <>
              <h1>
                {track.artists[0].name}, {track.artists[1].name}
              </h1>
            </>
          ) : (
            <h1>{track.artists[0].name}</h1>
          )}
        </div>
      </div>
      <h1>
        {track.disc_number}:{String(track.duration_ms).slice(0, 2)}
      </h1>
    </div>
  );
};

export default CartItemsTrack;
