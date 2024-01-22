import React from "react";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  const enlaceInsta = "https://www.instagram.com/cuatrommc";

  const abrirEnlace = () => {
    window.open(enlaceInsta, "_blank");
  };

  return (
    <section className="footer-section">
      <div className="footer-links">
        <div className="footer-column">
          <div>
            <h1>Empresa</h1>
            <ul>
              <li>Acerca de</li>
              <li>Empleo</li>
              <li>For the Record</li>
            </ul>
          </div>
          <div>
            <h1>Comunidades</h1>
            <ul>
              <li>Para artistas</li>
              <li>Desarrolladores</li>
              <li>Publicidad</li>
              <li>Inversores</li>
              <li>Proveedores</li>
            </ul>
          </div>
          <div>
            <h1>Enlaces útiles</h1>
            <ul>
              <li>Asistencia</li>
              <li>App gratis para móvil</li>
            </ul>
          </div>
        </div>
        <div className="footer-column-icons">
          <div onClick={abrirEnlace}>
            <AiOutlineInstagram />
          </div>
          <div>
            <AiOutlineTwitter />
          </div>
          <div>
            <BsFacebook />
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="footer-info">
        <ul>
          <li>Legal</li>
          <li>Centro de Privacidad</li>
          <li>Política de Privacidad</li>
          <li>Cookies</li>
          <li>Información sobre los anuncios</li>
          <li>Accesibilidad</li>
        </ul>
        <li>© 2023 Spotify AB</li>
      </div>
    </section>
  );
};

export default Footer;
