import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import { CgPlayPause } from "react-icons/cg";

const HomeRecommendation = ({
  item,
  playAlbum,
  saveIdList,
  isPlaying,
  playListState,
  redirectPage,
}) => {
  const [hovered, setHovered] = useState(false);

  const isTrackPlaying = item.id === playListState.id && isPlaying;

  const renderContent = () => {
    if (hovered) {
      return isTrackPlaying ? (
        <CgPlayPause onClick={() => playAlbum("albums", "pause")} />
      ) : (
        <BiPlay
          name="tu-icono"
          onClick={() => saveIdList("albums", item.tracks?.items[0].id)}
        />
      );
    }
  };

  return (
    <div
      className="contents"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onClick={() => redirectPage("album", item.id)}
        className={`${
          item === "heart" ? "saveList" : "adaptable-background"
        } imgHome`}
        style={
          item !== "heart"
            ? { backgroundImage: `url(${item?.images?.[2]?.url})` }
            : {}
        }
      >
        {item === "heart" ? <AiFillHeart /> : null}
      </div>
      <div
        className="contents-name"
        onClick={() => redirectPage("album", item.id)}
      >
        <h1>{item === "heart" ? "Canciones que te gustan" : item.name}</h1>
      </div>
      <div className="contents-icons">
        <div className={`${hovered ? "play-music on" : "play-music off"}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HomeRecommendation;
