import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaSpotify } from "react-icons/fa";

const Login = () => {
  // Obtén la función de inicio de sesión desde el contexto de autenticación
  const { login } = useAuth();

  const enlaceGit = "https://github.com/stvnmc/Spotify/tree/main";

  const abrirEnlace = () => {
    window.open(enlaceGit, "_blank");
  };

  return (
    <div className="login-cont">
      <div className="logo-container">
        <FaSpotify />
        <h1>Spotify Clon by Steven MC</h1>
      </div>

      <div className="login-form-cont">
        <div className="login-form">
          <h1>Inicia sesión en Spotify</h1>

          <div className="info-login">
            <p>Para acceder a este projecto nesecitas usar esta cuenta:</p>
            <h3>Correo Electrónico: spotifyapiproyect@gmail.com</h3>
            <h3>Contraseña: 123456789!@# </h3>
          </div>

          <div className="line"></div>

          <div onClick={login} className="buttom-login">
            Login
          </div>

          <div className="line"></div>

          <h3>¡Disfruta de SpotifyClon!</h3>
          <h3>
            Este sitio web está creado únicamente para practicar con el servicio
            de API de Spotify, mas informacion sobre el projecto
            <span onClick={abrirEnlace}> Link</span>.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
