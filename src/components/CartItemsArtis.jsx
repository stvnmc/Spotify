import React from "react";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const CartItemsArtis = ({ artist, redirectPage }) => {
  const { textLimit } = useTimeAndDate();

  return (
    <div
      className="contArtist"
      onClick={() => redirectPage("artist", artist.id)}
    >
      <div
        className="contImg contImgArtis"
        style={{
          backgroundImage: `url(${artist.images[0]?.url || "URL_POR_DEFECTO"})`,
        }}
      ></div>

      <div className="ContImgText">
        <h1>{textLimit("albums", artist.name)}</h1>
        <h1>Artist</h1>
      </div>
    </div>
  );
};

export default CartItemsArtis;
