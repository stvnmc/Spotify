import React, { useState, useEffect } from "react";

const Loading = () => {
  const [dotSize, setDotSize] = useState(10);

  // Efecto para cambiar el tamaño de los puntos en un intervalo de tiempo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotSize((prevSize) => (prevSize === 10 ? 15 : 10));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loader">
      <div className="dot" style={{ width: dotSize, height: dotSize }}></div>
      <div className="dot" style={{ width: 10, height: 10 }}></div>
      <div className="dot" style={{ width: dotSize, height: dotSize }}></div>
    </div>
  );
};

export default Loading;
