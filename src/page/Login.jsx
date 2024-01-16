import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaSpotify } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-cont">
      <div className="logo-container">
        <FaSpotify />
        <h1>Spotify Clon by Steven MC</h1>
      </div>
      <div className="login-form-cont">
        <div className="login-form">
          <h1>Inicia sesión en Spotify</h1>
          <p>
            Para iniciar seson en spotifyClon tienes que ingresar estas cuenta ,
            eemplo de cuenta, contrase;a ejemplo, si quieres saner porque el uso
            de esta cuenta lee aqui enlace
          </p>
          <div className="line"></div>
          <div onClick={login} className="buttom-login">
            Login
          </div>
          <div className="line"></div>
          <h3>
            este sitio web esta creado unicamente para practicar con el servicio
            de api de spotify
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
