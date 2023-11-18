import { createContext, useContext, useState } from "react";

export const TimeAndDateContext = createContext();

export const useTimeAndDate = () => {
  const context = useContext(TimeAndDateContext);

  if (!context) {
    console.error("useSearch must be used within a SearchProvider");
  }

  return context;
};

export const TimeAndDateProvider = ({ children }) => {
  const [scroll, setScroll] = useState(true);

  function allDurationSong(type, duration_ms) {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (type === "infoAlbum") {
      if (hours > 0) {
        return `${hours} h ${minutes} min`;
      }

      return `${minutes} min ${seconds} s`;
    }

    const formattedMinutes = `${minutes}`.padStart(2, "0");
    const formattedSeconds = `${seconds}`.padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function textLimit(type, text) {
    const maxLength = 17;

    if (type === "songs" && text.length > maxLength) {
      const maxLengthh = 34;
      return text.slice(0, maxLengthh) + "...";
    }

    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }

    return text;
  }

  function ScrollNav() {
    setScroll(true);
  }

  return (
    <TimeAndDateContext.Provider
      value={{
        allDurationSong,
        textLimit,
        ScrollNav,
        scroll,
      }}
    >
      {children}
    </TimeAndDateContext.Provider>
  );
};
