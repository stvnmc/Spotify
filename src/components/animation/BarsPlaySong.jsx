import React, { useState, useEffect } from "react";

const BarsPlatSong = () => {
  const [barSizes, setBarSizes] = useState([2, 2, 2, 2]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBarSizes((prevSizes) => prevSizes.map((size) => Math.random() * 18));
    }, 100);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="cont-bars">
      {barSizes.map((size, index) => (
        <div key={index} className="bar" style={{ height: `${size}px` }}></div>
      ))}
    </div>
  );
};

export default BarsPlatSong;
