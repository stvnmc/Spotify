import React, { useRef, useState, useEffect } from "react";
import { LiaHeart } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
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
import { useNavigate } from "react-router-dom";
import { useSerLibrary } from "../context/UserLibraryContext";

const Reproduccion = () => {
  const { playState, isPlaying, setIsPlaying, changePlayState, getInfoPlay } =
    usePlayMusic();

  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(3);
  const [hoveredVolumen, setHoveredVolumen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef(null);

  const [heart, setHiaHeart] = useState(false);

  const { name, album, artists, preview_url } = playState || {};

  const { saveUserLibrary, deleteUserLibrary, tracksUserLibrary } =
    useSerLibrary();

  const navigate = useNavigate();

  const redirectPage = async (site, id) => {
    navigate(`/${site}/${id}`, { replace: true });
  };

  const playPauseHandler = () => {
    if (isPlaying) return setIsPlaying(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    playPauseHandler();
    getInfoPlay();
  }, [playState]);

  useEffect(() => {
    const equal = tracksUserLibrary.tracksIds.some(
      (elemento) => elemento.id === playState?.id
    );

    setHiaHeart(equal);
  }, [playState, tracksUserLibrary]);

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

  function onAndOff() {
    if (volume > 0) setVolume(0);

    if (volume === 0) setVolume(10);
  }

  const IconVolume = () => {
    const volumeRanges = [
      {
        min: 1,
        max: 20,
        icon: <BsFillVolumeOffFill />,
      },
      {
        min: 21,
        max: 50,
        icon: <BsFillVolumeDownFill />,
      },
      {
        min: 51,
        max: 100,
        icon: <BsFillVolumeUpFill />,
      },
    ];

    const matchingRange = volumeRanges.find(
      (range) => volume >= range.min && volume <= range.max
    );

    return matchingRange ? matchingRange.icon : <BsVolumeMuteFill />;
  };

  if (!playState) return <></>;

  return (
    <div className="reproduction">
      <div className="info-reproduction">
        <div
          className="contImg adaptable-background "
          style={{
            backgroundImage: `url(${album?.images?.[1].url})`,
          }}
          onClick={() => redirectPage("album", playState?.album.id)}
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
          {playState.name ? (
            heart ? (
              <FaHeart
                className="save"
                onClick={() => deleteUserLibrary(playState.id, "song")}
              />
            ) : (
              <LiaHeart onClick={() => saveUserLibrary(playState.id, "song")} />
            )
          ) : (
            ""
          )}
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
        <div className="iconsVolumen" onClick={() => onAndOff()}>
          <IconVolume />
        </div>
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
