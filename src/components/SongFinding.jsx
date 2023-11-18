import React, { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { LiaHeart } from "react-icons/lia";
import { RiMoreLine } from "react-icons/ri";
import { useTimeAndDate } from "../context/TimeAndDateContext";
import { useNavigate } from "react-router-dom";

const CartItemsTrack = ({ track }) => {
  const { textLimit } = useTimeAndDate();

  const navigate = useNavigate();

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`, { replace: true });
    window.location.reload();
  };

  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="track"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="contImgText">
        <div
          className="contImg adaptable-background center"
          style={{ backgroundImage: `url(${track.album.images[2].url})` }}
        >
          {hovered ? <BiPlay /> : ""}
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
        <div className="track-icons">{hovered ? <LiaHeart /> : ""}</div>
        <div className="trackNumTime">
          {track.disc_number}:{String(track.duration_ms).slice(0, 2)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : ""}</div>
      </div>
    </div>
  );
};

export default CartItemsTrack;
