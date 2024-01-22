import React from "react";
import { FaSpotify } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const redirectPage = () => {
    navigate(`/`, { replace: true });
  };

  return (
    <div className="PageNotFound">
      <FaSpotify />
      <h1>Página no disponible</h1>
      <h3>Ha habido un error. Prueba de nuevo más tarde.</h3>
      <div onClick={redirectPage}>
        <h3>Inicio</h3>
      </div>
    </div>
  );
};

export default Page404;

