import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSearch } from "../context/SearchContext";
import CartItems from "../components/cartItems";

const Finding = () => {
  const { funcionSearch, album } = useSearch();
  console.log(album);
  return (
    <section className="search">
      <form className="inputSearch">
        <BiSearch />
        <input
          type="text"
          placeholder="¿Qué te apetece escuchar?"
          onChange={(e) => funcionSearch(e.target.value)}
        />
      </form>

      <div className="album">
        {album && album.map((artis, i) => <CartItems artis={artis} key={i} />)}
      </div>
    </section>
  );
};

export default Finding;
