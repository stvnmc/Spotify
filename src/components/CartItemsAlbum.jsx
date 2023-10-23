import React from "react";

const CartItems = ({ artis }) => {
  return (
    <div className="contAlbum">
      <div
        className="contImg"
        style={{ backgroundImage: `url(${artis.images[1].url})` }}
      ></div>
      <div>
        <h1>{artis.name}</h1>
        <div className="dateAlbum">
          <h1>{new Date(artis.release_date).getFullYear()}</h1>
          <div></div>
          <h1>{artis.artists[0].name}</h1>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
