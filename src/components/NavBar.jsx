import React from "react";
import { GoBell, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
const NavBar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  const goForward = () => {
    navigate(1); // Navegar hacia adelante
  };

  const enlaceGithub = "https://github.com/stvnmc";

  const abrirEnlace = () => {
    window.open(enlaceGithub, "_blank");
  };

  return (
    <section className="navBar">
      <nav>
        <div className="iconsC" onClick={goBack}>
          <GoChevronLeft />
        </div>
        <div className="iconsC" onClick={goForward}>
          <GoChevronRight />
        </div>
      </nav>

      <div className="app-bar">
        <div className="iconsC" onClick={abrirEnlace}>
          <FaGithub />
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
