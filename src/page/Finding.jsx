import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSearch } from "../context/SearchContext";
import CartItemsAlbum from "../components/cartItemsAlbum";
import CartItemsArtis from "../components/CartItemsArtis";
import CartItemsTrack from "../components/CartItemsTrack";
import { useNavigate } from "react-router-dom";

const Finding = () => {
  const { funcionSearch, artists, albums, tracks } = useSearch();
  const navigate = useNavigate();

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`);
  };

  const renderCartItemsTrack = () => {
    return tracks.map((track, i) => <CartItemsTrack track={track} key={i} />);
  };

  return (
    <section className="search">
      <form className="inputSearch">
        <BiSearch />
        <input
          type="text"
          placeholder="¿Qué te apetece escuchar?"
          onChange={(e) => funcionSearch(e.target.value)}
        />
      </form>
      <>
        <nav className="menu">
          <button>Todo</button>
          <button>Artists</button>
          <button>Sons</button>
          <button>Albums</button>
          <button>Playlist</button>
        </nav>
        {artists.length > 0 && (
          <div className="contStart">
            <h1>Resultado principal</h1>
            <div className="searchMain">
              <img src={artists[0].images[2]?.url} alt={artists[0].name} />
              <h1>{artists[0].name}</h1>
              <div>
                <h1>Artist</h1>
              </div>
            </div>
          </div>
        )}
        {tracks.length > 0 && (
          <div className="contSongs">
            <h1>Canciones</h1>
            <div className="allSong">{renderCartItemsTrack()}</div>
          </div>
        )}
        {artists.length > 0 && (
          <div className="list">
            <h1>Artis</h1>
            <div className="artis">
              {artists.map((artist, i) => (
                <CartItemsArtis
                  redirectPage={redirectPage}
                  artist={artist}
                  key={i}
                />
              ))}
            </div>
          </div>
        )}
        {albums.length > 0 && (
          <div className="list">
            <h1>Album</h1>
            <div className="album">
              {albums.map((album, i) => (
                <CartItemsAlbum
                  redirectPage={redirectPage}
                  album={album}
                  key={i}
                />
              ))}
            </div>
          </div>
        )}
      </>
    </section>
  );
};

export default Finding;
