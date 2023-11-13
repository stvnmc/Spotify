import React from "react";
import { useTimeAndDate } from "../context/TimeAndDateContext";

const CartItemsAlbums = ({ album, redirectPage }) => {
  const { textLimit } = useTimeAndDate();

  return (
    <div className="contAlbum" onClick={() => redirectPage("album", album.id)}>
      <div
        className="contImg"
        style={{ backgroundImage: `url(${album.images[1].url})` }}
      ></div>
      <div className="contName">
        <h1>{textLimit("list", album.name)}</h1>
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
