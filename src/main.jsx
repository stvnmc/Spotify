import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { TimeAndDateProvider } from "./context/TimeAndDateContext.jsx";
import { PlayMusicProvider } from "./context/PlayMusicContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <TimeAndDateProvider>
        <PlayMusicProvider>
          <App />
        </PlayMusicProvider>
      </TimeAndDateProvider>
    </SearchProvider>
  </AuthProvider>
);
