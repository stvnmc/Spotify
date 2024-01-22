import { createContext, useContext, useEffect, useState } from "react";
import ColorThief from "colorthief";

export const TimeAndDateContext = createContext();

export const useTimeAndDate = () => {
  const context = useContext(TimeAndDateContext);

  if (!context) {
    console.error("useTimeAndDate must be used within a TimeAndDateProvider");
  }

  return context;
};

export const TimeAndDateProvider = ({ children }) => {
  // Estado local que controla si el usuario está desplazándose
  const [scroll, setScroll] = useState(true);

  // Función para formatear la duración de las canciones
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

  // Función para limitar la longitud de texto
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

  // Función para manejar el evento de desplazamiento
  function ScrollNav() {
    setScroll(true);
  }

  // Estado local y funciones relacionadas con la manipulación de imágenes y colores
  const [imageUrl, setImageUrl] = useState(null);
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

  // Función para cargar una imagen como objeto Blob
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
        setImageUrl,
      }}
    >
      {children}
    </TimeAndDateContext.Provider>
  );
};