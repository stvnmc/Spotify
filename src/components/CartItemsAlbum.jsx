import React from "react";

const CartItems = ({ artis }) => {
  const maxLength = 23;
  return (
    <div className="contAlbum">
      <div
        className="contImg"
        style={{ backgroundImage: `url(${artis.images[1].url})` }}
      ></div>
      <div className="contName">
        <h1>
          {artis.name.length > maxLength
            ? artis.name.slice(0, maxLength - 3) + "..."
            : artis.name}
        </h1>
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
