import React from "react";
import { GoBell, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { BsArrowDownCircle, BsPerson } from "react-icons/bs";
const NavBar = () => {
  return (
    <section className="navBar">
      <nav>
        <div className="iconsC">
          <GoChevronLeft />
        </div>
        <div className="iconsC">
          <GoChevronRight />
        </div>
      </nav>

      <div className="app-bar">
        <div className="app-bar-item">
          <BsArrowDownCircle />
          <h1>instalar app</h1>
        </div>
        <div className="iconsC">
          <GoBell />
        </div>
        <div className="iconsC">
          <BsPerson />
        </div>
      </div>
    </section>
  );
};

export default NavBar;
