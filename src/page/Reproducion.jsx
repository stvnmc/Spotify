import React, { useEffect } from "react";
import { LiaHeart } from "react-icons/lia";
import {
  CgPlayTrackPrev,
  CgPlayTrackNext,
  CgPlayPause,
  CgPlayButton,
} from "react-icons/cg";
import { usePlayMusic } from "../context/PlayMusicContext";
import LoginPlayState from "../components/LoginPlayState";

const Reproduccion = () => {
  const { playState } = usePlayMusic();

  const setVolume = (e) => {};

  return (
    <>
      {playState ? (
        <div className="reproduction">
          <div className="info-reproduction">
            <div
              className="contImg adaptable-background"
              style={{
                backgroundImage: `url(${playState.album.images[1].url})`,
              }}
            ></div>

            {/* <div className="nameTrack">
              <h1>{playState.name}</h1>
              <h1>{playState.artists[0].name}</h1>
            </div> */}

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
          <div>
            <CgPlayTrackPrev />
            <CgPlayButton />
            <CgPlayPause />
            <CgPlayTrackNext />
          </div>
          <div>
            <input
              type="range"
              min={0}
              max={100}
              onMouseUp={(e) => setVolume(e)}
            />
          </div>
        </div>
      ) : (
        <LoginPlayState />
      )}
    </>
  );
};

export default Reproduccion;
