import React, { useEffect } from "react";
import { usePlayMusic } from "../context/PlayMusicContext";

const Reproduccion = () => {
  const { functionPlaybackState, playbackState } = usePlayMusic();

  useEffect(() => {}, []);

  // Verifica si playbackState[0] está definido antes de intentar acceder a 'uri'
  // const trackURI = playbackState[0] ? playbackState[0].uri.split(":")[2] : null;

  return (
    <div className="reproduccion">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Reproduccion;
