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
  function login() {
    redirectToSpotifyAuthorization();
  }

  function lounge() {
    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    const storedCode = localStorage.getItem("spotifyCode");

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      try {
        autenticate(storedCode);
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }

    const refreshTokenInterval = setInterval(() => {
      lounge();
      return () => clearInterval(refreshTokenInterval);
    }, 1000 * 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ login, lounge }}>{children}</AuthContext.Provider>
  );
};
