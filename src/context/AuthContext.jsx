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
  }, []);

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
