import React, { createContext, useContext, useEffect, useState } from "react";
import {
  autenticate,
  redirectToSpotifyAuthorization,
  refreshToken,
} from "../api/auth";

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
    if (!accessToken) {
      try {
        autenticate(storedCode);
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }
    setSpotyCode(accessToken);

    // Refresh token logic
    const refreshTokenInterval = setInterval(() => {
      try {
        refreshToken();
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }, 3600 * 1000); // 3600 seconds (1 hour)

    return () => clearInterval(refreshTokenInterval);
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
