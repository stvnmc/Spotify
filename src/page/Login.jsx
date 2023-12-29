import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-cont">
      <div className="login-text">
        <h1>bienvenido a la clon sopotify web</h1>
        <p>
          este priyecto nesecita una cuenta registrada en
          https://developer.spotify.com/, si quieres leer mas acerca de esto
          visita la documentacion Aqui
        </p>
      </div>
      <div className="login-button">
        <div onClick={login}>Login</div>
      </div>
    </div>
  );
};

export default Login;
