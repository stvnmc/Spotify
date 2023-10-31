import React from "react";

const CartItems = ({ album, redirectPage }) => {
  const maxLength = 20;
  return (
    <div className="contAlbum" onClick={() => redirectPage("album", album.id)}>
      <div
        className="contImg"
        style={{ backgroundImage: `url(${album.images[1].url})` }}
      ></div>
      <div className="contName">
        <h1>
          {album.name.length > maxLength
            ? album.name.slice(0, maxLength - 3) + "..."
            : album.name}
        </h1>
        <div className="dateAlbum">
          <h1>{new Date(album.release_date).getFullYear()}</h1>
          <div></div>
          <h1>{album.artists[0].name}</h1>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
