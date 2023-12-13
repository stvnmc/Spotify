import { createContext, useContext, useEffect, useState } from "react";
import ColorThief from "colorthief";

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

  // color

  const [imageUrl, setImageUrl] = useState(null);

  // const imageUrl = artistInfoPage?.images[0].url;
  const [backgroundColor, setBackgroundColor] = useState("rgba(0, 0, 0, 1)");
  const [backgroudGrandient, setBackgroudGrandient] =
    useState("rgba(0, 0, 0, 1)");

  useEffect(() => {
    const coloImg = async () => {
      if (imageUrl) {
        try {
          const imgBlob = await loadImageAsBlob(imageUrl);
          const img = new Image();
          img.src = URL.createObjectURL(imgBlob);

          img.addEventListener("load", () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);

            const rgbaColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
            const rgbaGrand = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 70%)`;

            setBackgroundColor(rgbaColor);
            setBackgroudGrandient(rgbaGrand);
          });
        } catch (error) {
          console.error("Error al cargar la imagen", error);
        }
      }
    };

    coloImg();
  }, [imageUrl]);

  const loadImageAsBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

  return (
    <TimeAndDateContext.Provider
      value={{
        allDurationSong,
        textLimit,
        ScrollNav,
        scroll,
        backgroundColor,
        backgroudGrandient,
        setImageUrl
      }}
    >
      {children}
    </TimeAndDateContext.Provider>
  );
};
