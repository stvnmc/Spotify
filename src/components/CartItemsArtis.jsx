import React from "react";

const CartItemsArtis = ({ artis }) => {
  return (
    <div className="contArtist">
      <div
        className="contImg contImgArtis"
        style={{
          backgroundImage: `url(${artis.images[0]?.url || "URL_POR_DEFECTO"})`,
        }}
      ></div>

      <div className="ContImgText">
        <h1>{artis.name}</h1>
        <h1>Artist</h1>
      </div>
    </div>
  );
};

export default CartItemsArtis;
