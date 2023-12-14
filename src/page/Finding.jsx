import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BiPlay } from "react-icons/bi";
import { useSearch } from "../context/SearchContext";
import CartItemsAlbum from "../components/cartItemsAlbum";
import CartItemsArtis from "../components/CartItemsArtis";
import SongFinding from "../components/songs/SongFinding";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePlayMusic } from "../context/PlayMusicContext";

const Finding = () => {
  const { funcionSearch, artists, albums, tracks } = useSearch();
  const { saveIdList, idPlayState, isPlaying, playAlbum } = usePlayMusic();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`);
  };

  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
  });

  const q = searchParams.get("q");

  useEffect(() => {
    funcionSearch(q);
  }, [q]);

  const handleInputChange = (e) => {
    setSearchParams((prev) => {
      prev.set("q", e.target.value);
      return prev;
    });
  };

  // render page

  const MainResult = ({ artist }) => (
    <div className="contStart">
      <h1>Resultado principal</h1>
      <div
        className="searchMain"
        onClick={() => redirectPage("artist", artist.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="contImaMain adaptable-background"
          style={{ backgroundImage: `url(${artist.images[2]?.url})` }}
        ></div>
        <h1>{artist.name}</h1>
        <div className="contNameMain">
          <h1>Artist</h1>
        </div>
        <div className={`play-music ${hovered ? "on" : "off"}`}>
          <BiPlay />
        </div>
      </div>
    </div>
  );

  const TracksMain = () => (
    <div className="contSongs">
      <h1>Canciones</h1>
      <div className="allSong">
        {tracks.map((track, i) => {
          return (
            <SongFinding
              track={track}
              key={i}
              saveIdList={saveIdList}
              idPlayState={idPlayState}
              isPlaying={isPlaying}
              playAlbum={playAlbum}
            />
          );
        })}
      </div>
    </div>
  );

  const Artists = () => (
    <div className="contlist">
      <h1>Artis</h1>
      <div className="artis">
        {artists.map((artist, i) => (
          <CartItemsArtis redirectPage={redirectPage} artist={artist} key={i} />
        ))}
      </div>
    </div>
  );

  const Albums = () => (
    <div className="contlist">
      <h1>Album</h1>
      <div className="album">
        {albums.map((album, i) => (
          <CartItemsAlbum redirectPage={redirectPage} album={album} key={i} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="search">
      <form className="inputSearch">
        <BiSearch />
        <input
          type="text"
          placeholder="¿What do you want to hear?"
          value={q}
          onChange={handleInputChange}
        />
      </form>
      <>
        <div className="finding-main">
          {artists.length > 0 && <MainResult artist={artists[0]} />}

          {tracks.length > 0 && <TracksMain />}
        </div>

        {artists.length > 0 && <Artists />}
        {albums.length > 0 && <Albums />}
      </>
    </section>
  );
};

export default Finding;
