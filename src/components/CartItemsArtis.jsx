import React, { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const CartItemsArtis = ({ artist, redirectPage }) => {
  const { textLimit } = useTimeAndDate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="contArtist"
      onClick={() => redirectPage("artist", artist.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="contImg contImgArtis adaptable-background"
        style={{
          backgroundImage: `url(${artist.images[0]?.url || "URL_POR_DEFECTO"})`,
        }}
      >
        <div className={`play-music ${hovered ? "on" : "off"}`}>
          <BiPlay />
        </div>
      </div>

      <div className="ContImgText">
        <h1>{textLimit("albums", artist.name)}</h1>
        <h1>Artist</h1>
      </div>
    </div>
  );
};

export default CartItemsArtis;
