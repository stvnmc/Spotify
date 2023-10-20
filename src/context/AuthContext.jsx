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
  const [spotyCode, setSpotyCode] = useState(null);

  function login() {
    redirectToSpotifyAuthorization();
  }

  useEffect(() => {
    const storedCode = localStorage.getItem("spotifyCode");
    if (!storedCode) getCode();

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) autenticate(storedCode);
    setSpotyCode(accessToken);
  }, []);

  function getCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const spotyCode = urlParams.get("code");
    if (spotyCode) {
      localStorage.setItem("spotifyCode", spotyCode);
      window.location = "/";
    }
  }

  return (
    <AuthContext.Provider value={{ spotyCode, login }}>
      {children}
    </AuthContext.Provider>
  );
};
