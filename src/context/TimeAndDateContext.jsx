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
  function allDurationSong(duration_ms) {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function allDurationSong(duration_ms) {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}${minutes}sddsd`;
    }

    const formattedMinutes = `${minutes}`.padStart(2, "0");
    const formattedSeconds = `${seconds}`.padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <TimeAndDateContext.Provider value={{ allDurationSong }}>
      {children}
    </TimeAndDateContext.Provider>
  );
};
