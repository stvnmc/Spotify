import React, { useEffect } from "react";
import {
  CgPlayTrackPrev,
  CgPlayTrackNext,
  CgPlayPause,
  CgPlayButton,
} from "react-icons/cg";

import { usePlayMusic } from "../context/PlayMusicContext";

const Reproduccion = () => {
  const { functionPlaybackState, playbackState } = usePlayMusic();

  useEffect(() => {}, []);

  const setVolume = (e) => {};
  return (
    <div className="reproduccion">
      <div>
        
      </div>
      <div>
        <CgPlayTrackPrev />
        <CgPlayButton />
        <CgPlayPause />
        <CgPlayTrackNext />
      </div>
      <div>
        <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
      </div>
    </div>
  );
};

export default Reproduccion;
