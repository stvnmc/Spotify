import React, { useRef, useState, useEffect } from "react";
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

const Reproduccion = () => {
  const { playState, isPlaying, setIsPlaying, changePlayState } =
    usePlayMusic();

  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(3);
  const [hoveredVolumen, setHoveredVolumen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef(null);

  const { name, album, artists, preview_url } = playState || {};

  const playPauseHandler = () => {
    if (isPlaying) return setIsPlaying(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    playPauseHandler();
  }, [playState]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying !== null) {
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef.current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [audioRef.current]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleTrackChange = (e) => {
    if (audioRef.current) {
      setCurrentTime(e.target.value);
      audioRef.current.currentTime = e.target.value;
    }
  };

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
            backgroundImage: `url(${album?.images?.[1].url})`,
          }}
        ></div>

        <div className="nameTrack">
          <h1>{name}</h1>
          <div className="track-artist">
            <h1>
              {playState.artists?.map((artist, index) => (
                <span
                  key={artist.id}
                  onClick={() => redirectPage("artist", artist.id)}
                >
                  {artist.name}
                  {index < artists.length - 1 && ", "}
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
          src={preview_url}
          controls={false}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onEnded={() => changePlayState("next")}
        ></audio>
        <div className="player-controls">
          <CgPlayTrackPrev onClick={() => changePlayState("back")} />
          <div
            onClick={() => playPauseHandler()}
            className={`play ${isPlaying ? "pause" : ""}`}
          >
            {isPlaying ? <CgPlayPause /> : <CgPlayButton />}
          </div>
          <CgPlayTrackNext onClick={() => changePlayState("next")} />
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
