import React, { useEffect, useState } from "react";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { RiMoreLine } from "react-icons/ri";
import { useTimeAndDate } from "../context/TimeAndDateContext";
import BarsPlaySong from "./animation/BarsPlaySong";
import { useNavigate } from "react-router-dom";
import { CgPlayPause } from "react-icons/cg";
import { useSerLibrary } from "../context/UserLibraryContext";

const CartItemsTrack = ({
  track,
  saveIdList,
  idPlayState,
  isPlaying,
  playAlbum,
}) => {
  const { textLimit } = useTimeAndDate();
  const { saveUserLibrary, tracksUserLibrary, deleteUserLibrary } =
    useSerLibrary();

  const navigate = useNavigate();

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`, { replace: true });
    window.location.reload();
  };

  const [hovered, setHovered] = useState(false);

  const [heart, setHiaHeart] = useState(false);

  useEffect(() => {
    const equal = tracksUserLibrary.tracksIds.some(
      (elemento) => elemento.id === track.id
    );

    setHiaHeart(equal);
  }, [tracksUserLibrary]);

  const isTrackPlaying = track.id === idPlayState && isPlaying;

  const renderContent = () => {
    if (hovered) {
      return isTrackPlaying ? (
        <CgPlayPause onClick={() => playAlbum("albums", "pause")} />
      ) : (
        <BiPlay
          name="tu-icono"
          onClick={() => saveIdList("albums", track.id)}
        />
      );
    } else if (track.id === idPlayState) {
      return !isTrackPlaying ? "" : <BarsPlaySong />;
    }

    return;
  };

  return (
    <div
      className={`track ${track.id === idPlayState ? "hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="contImgText">
        <div
          className="contImg adaptable-background center"
          style={{ backgroundImage: `url(${track.album.images[2].url})` }}
        >
          {renderContent()}
        </div>
        <div className="nameTrack">
          <h1>{textLimit("songs", track.name)}</h1>
          <div className="track-artist">
            <h1>
              <span onClick={() => redirectPage("artist", track.artists[0].id)}>
                {track.artists[0].name}
              </span>
              {track.artists[1] && (
                <span
                  onClick={() => redirectPage("artist", track.artists[1].id)}
                >
                  {`, ${track.artists[1].name}`}
                </span>
              )}
            </h1>
          </div>
        </div>
      </div>

      <div className="track-right">
        <div className="track-icons">
          {heart ? (
            <FaHeart
              className="save"
              onClick={() => deleteUserLibrary(track.id, "song")}
            />
          ) : hovered ? (
            <LiaHeart onClick={() => saveUserLibrary(track.id, "song")} />
          ) : (
            ""
          )}
        </div>
        <div className="trackNumTime">
          {track.disc_number}:{String(track.duration_ms).slice(0, 2)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : ""}</div>
      </div>
    </div>
  );
};

export default CartItemsTrack;
