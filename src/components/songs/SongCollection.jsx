import React, { useEffect, useState } from "react";
import { useTimeAndDate } from "../../context/TimeAndDateContext";
import timeAgo from "../functions/TimeAgo";

// icons
import { RiMoreLine } from "react-icons/ri";
import { LiaHeart } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { useSerLibrary } from "../../context/UserLibraryContext";
import { BiPlay } from "react-icons/bi";
import BarsPlaySong from "../animation/BarsPlaySong";
import { CgPlayPause } from "react-icons/cg";

function SongCollection({
  song,
  i,
  tracksIds,
  idPlayState,
  isPlaying,
  saveIdList,
  playAlbum,
  redirectPage,
}) {
  const { allDurationSong } = useTimeAndDate();
  const [hovered, setHovered] = useState(false);
  const [heart, setHiaHeart] = useState(false);

  const { saveUserLibrary, tracksUserLibrary, deleteUserLibrary } =
    useSerLibrary();

  useEffect(() => {
    const equal = tracksUserLibrary.tracksIds.some(
      (elemento) => elemento.id === song.id
    );

    setHiaHeart(equal);
  }, [tracksUserLibrary]);

  const isTrackPlaying = song.id === idPlayState && isPlaying;

  const renderContent = () => {
    if (hovered) {
      return isTrackPlaying ? (
        <CgPlayPause onClick={() => playAlbum("collection", "pause")} />
      ) : (
        <BiPlay
          name="tu-icono"
          onClick={() => saveIdList("collection", song.id)}
        />
      );
    } else if (song.id === idPlayState) {
      return !isTrackPlaying ? song.track_number : <BarsPlaySong />;
    }

    return i;
  };

  return (
    <div
      className={`track collection ${song.id === idPlayState ? "hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={() => saveIdList("albums", song.id)}
    >
      <div className="infoTrack trackCollection">
        <div className="number center">{renderContent()}</div>
        <div
          className="ImgColletion adaptable-background"
          style={{
            backgroundImage: `url(${song.album.images[2].url || ""})`,
          }}
        ></div>
        <div className="collectionNameArtists">
          <h1>{song.name}</h1>
          <h1>
            {song.artists.map((artist, index) => (
              <span key={artist.id}>
                <span onClick={() => redirectPage("artist", artist.id)}>
                  {artist.name}
                </span>
                {index < song.artists.length - 1 && ", "}
              </span>
            ))}
          </h1>
        </div>
      </div>
      <div
        className="nameAlbum"
        onClick={() => redirectPage("album", song?.album?.id)}
      >
        <p>{song.album.name}</p>
      </div>
      <div className="timeAgo">
        <h1>{timeAgo(tracksIds?.dateAdded)}</h1>
      </div>
      <div className="track-right">
        <div className="track-icons">
          {heart ? (
            <FaHeart
              className="save"
              onClick={() => deleteUserLibrary(song.id, "song")}
            />
          ) : hovered ? (
            <LiaHeart onClick={() => saveUserLibrary(song.id, "song")} />
          ) : (
            ""
          )}
        </div>
        <div className="trackNumTime">
          {allDurationSong("song", song.duration_ms)}
        </div>
        <div className="track-icons">{hovered ? <RiMoreLine /> : ""}</div>
      </div>
    </div>
  );
}

export default SongCollection;
