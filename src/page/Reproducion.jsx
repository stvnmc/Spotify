import React, { useRef, useState } from "react";
import { LiaHeart } from "react-icons/lia";
import {
  CgPlayTrackPrev,
  CgPlayTrackNext,
  CgPlayPause,
  CgPlayButton,
} from "react-icons/cg";

import {
  BsVolumeMuteFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
  BsFillVolumeOffFill,
} from "react-icons/bs";

import { usePlayMusic } from "../context/PlayMusicContext";
import LoginPlayState from "../components/LoginPlayState";
import { useEffect } from "react";

const Reproduccion = () => {
  const { playState, isPlaying, setIsPlaying } = usePlayMusic();

  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(20);

  const [hoveredVolumen, setHoveredVolumen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const audioRef = useRef(null);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [playState]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };
  const handleTrackChange = (e) => {
    setCurrentTime(e.target.value);

    audioRef.current.currentTime = e.target.value;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [audioRef.current]);

  const IconVolume = () => {
    const volumeRanges = [
      { min: 1, max: 20, icon: <BsFillVolumeOffFill /> },
      { min: 21, max: 50, icon: <BsFillVolumeDownFill /> },
      { min: 51, max: 100, icon: <BsFillVolumeUpFill /> },
    ];

    const matchingRange = volumeRanges.find(
      (range) => volume >= range.min && volume <= range.max
    );

    return matchingRange ? matchingRange.icon : <BsVolumeMuteFill />;
  };

  if (!playState) return <LoginPlayState />;

  return (
    <div className="reproduction">
      <div className="info-reproduction">
        <div
          className="contImg adaptable-background"
          style={{
            backgroundImage: `url(${playState?.album?.images?.[1].url})`,
          }}
        ></div>

        <div className="nameTrack">
          <h1>{playState.name}</h1>
          <div className="track-artist">
            <h1>
              {playState.artists.map((artist, index) => (
                <span
                  key={artist.id}
                  onClick={() => redirectPage("artist", artist.id)}
                >
                  {artist.name}
                  {index < playState.artists.length - 1 && ", "}
                </span>
              ))}
            </h1>
          </div>
        </div>
        <div className="track-icons">
          <LiaHeart />
        </div>
      </div>
      <div className="audio-player">
        <audio
          ref={audioRef}
          src={playState.preview_url}
          controls={false}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onEnded={() => setIsPlaying(false)}
        ></audio>
        <div className="player-controls">
          <CgPlayTrackPrev />
          <div
            onClick={() => playPauseHandler()}
            className={`play ${isPlaying ? "pause" : ""}`}
          >
            {isPlaying ? <CgPlayPause /> : <CgPlayButton />}
          </div>
          <CgPlayTrackNext />
        </div>
        <div
          className="player-info"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span>{Math.floor(currentTime)}</span>
          <input
            style={{
              background: `linear-gradient(90deg, ${
                hovered ? "#20d660" : "#fefffe"
              } ${(currentTime / 30) * 100}%, #4d4c4d ${
                (currentTime / 30) * 100
              }%)`,
            }}
            type="range"
            min={0}
            onChange={handleTrackChange}
            value={currentTime}
            max={30}
          />
          <span>30</span>
        </div>
      </div>
      <div
        className="volume"
        onMouseEnter={() => setHoveredVolumen(true)}
        onMouseLeave={() => setHoveredVolumen(false)}
      >
        <IconVolume />
        <input
          style={{
            background: `linear-gradient(90deg, ${
              hoveredVolumen ? "#20d660" : "#fefffe"
            } ${volume}%, #4d4c4d ${volume}%)`,
          }}
          type="range"
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={100}
        />
        <div className="volume-input"></div>
      </div>
    </div>
  );
};

export default Reproduccion;
