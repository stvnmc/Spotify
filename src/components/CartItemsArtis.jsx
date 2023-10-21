import React from "react";

const CartItemsArtis = ({ artis }) => {
  return (
    <div className="contAlbum">
      <img src={artis.images[1].url ? artis.images[1].url : <></>} />
      <h2>{artis.name}</h2>
      <h2>Artist</h2>
    </div>
  );
};

export default CartItemsArtis;
