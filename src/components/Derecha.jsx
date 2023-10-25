import React from "react";
import { BiSearch } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai";
import { FiMusic } from "react-icons/fi";
import { Link } from "react-router-dom";

const derecha = () => {

  return (
    <header>
      <nav className="topNav">
        <Link to="/">
          <GoHome />
        </Link>
        <Link to="/search">
          <BiSearch />
        </Link>
      </nav>
      <nav className="bottomNav">
        <VscLibrary />
        <AiFillHeart />
        <FiMusic />
      </nav>
    </header>
  );
};

export default derecha;
