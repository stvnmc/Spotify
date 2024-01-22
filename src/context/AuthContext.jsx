import React, { createContext, useContext, useEffect, useState } from "react";
import { autenticate, redirectToSpotifyAuthorization } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log("need login");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Función para redirigir a la página de autorización de Spotify
  function login() {
    redirectToSpotifyAuthorization();
  }

  // Efecto para realizar la autenticación al cargar la aplicación
  useEffect(() => {
    // Obtener el código almacenado en localStorage
    const storedCode = localStorage.getItem("spotifyCode");

    // Obtener el token de acceso almacenado en localStorage
    const accessToken = localStorage.getItem("access_token");

    // Si no hay token de acceso, realizar la autenticación
    if (!accessToken) {
      try {
        autenticate(storedCode);
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }
  }, []);

  // Proveedor de contexto que proporciona la función de inicio de sesión
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
