import React, { createContext, useContext, useEffect, useState } from "react";
import { redirectToSpotifyAuthorization } from "../api/auth";

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
  const storedCode = localStorage.getItem("spotifyCode");

  if (spotyCode) {
    localStorage.setItem("spotifyCode", spotyCode);
    window.location = "/";
  }

  const login = async () => {
    try {
      redirectToSpotifyAuthorization();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotyCode = urlParams.get("code");

    setSpotyCode(spotyCode);
  }, [login]);

  return (
    <AuthContext.Provider value={{ login, spotyCode, storedCode }}>
      {children}
    </AuthContext.Provider>
  );
};
