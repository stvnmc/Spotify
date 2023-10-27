import React from "react";

const CartItemsTrack = ({ track }) => {
  return (
    <div className="contSong">
      <div className="contImgText">
        <img src={track.album.images[2].url} />
        <div className="text">
          <h1>{track.name}</h1>
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
