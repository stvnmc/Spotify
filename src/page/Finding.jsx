import React from "react";
import { BiSearch } from "react-icons/bi";

const Finding = () => {
  return (
    <section className="search">
      <form className="inputSearch">
        <BiSearch />
        <input type="text" placeholder="¿Qué te apetece escuchar?" />
      </form>
    </section>
  );
};

export default Finding;
