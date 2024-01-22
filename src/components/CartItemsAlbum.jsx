import React, { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const CartItemsAlbums = ({ album, redirectPage }) => {
  const { textLimit } = useTimeAndDate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="contAlbum"
      onClick={() => redirectPage("album", album.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Contenedor de la imagen del álbum */}
      <div
        className="contImg adaptable-background"
        style={{ backgroundImage: `url(${album.images[1].url})` }}
      >
        {/* Ícono de reproducción cuando el mouse está sobre la imagen */}
        <div className={`play-music ${hovered ? "on" : "off"}`}>
          <BiPlay />
        </div>
      </div>

      {/* Contenedor de información del álbum */}
      <div className="contName">
        <h1>{textLimit("list", album.name)}</h1>

        {/* Información de fecha y artistas */}
        <div className="dateAlbum">
          <h1>{new Date(album.release_date).getFullYear()}</h1>
          <div></div>
          <h1>
            {textLimit(
              "list",
              `${album.artists[0]?.name}${
                album.artists[1] ? `, ${album.artists[1]?.name}` : ""
              }`
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CartItemsAlbums;
