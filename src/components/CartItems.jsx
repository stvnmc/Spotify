import React from "react";

const CartItems = ({ artis }) => {
  return (
    <div className="contAlbum">
      <div>
        <img src={artis.images[1].url} />
      </div>
      <h1>{artis.name}</h1>
      <div className="dateArtis">
        <h1>{new Date(artis.release_date).getFullYear()}</h1>
        <h1>.</h1>
        <h1>{artis.artists[0].name}</h1>
      </div>

      <img />
    </div>
  );
};

export default CartItems;
