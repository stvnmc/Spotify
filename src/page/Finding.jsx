import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSearch } from "../context/SearchContext";
import CartItemsAlbum from "../components/cartItemsAlbum";
import CartItemsArtis from "../components/CartItemsArtis";
import CartItemsTrack from "../components/CartItemsTrack";

const Finding = () => {
  const { funcionSearch, album, artist, track } = useSearch();

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
        <div className="StartSearch">
          {artist.length > 0 ? (
            <div className="contStart">
              <h1>Resultado principal</h1>
              <div className="searchMain">
                <img src={artist[0].images[2]?.url} alt={artist[0].name} />
                <h1>{artist[0].name}</h1>
                <div>
                  <h1>Artist</h1>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {track.length > 0 ? (
            <div className="contSongs">
              <h1>Canciones</h1>
              <div className="allSong">
                {track.map((song, i) => {
                  return <CartItemsTrack song={song} key={i} />;
                })}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {artist.length > 0 ? (
          <div className="list">
            <h1>Artis</h1>
            <div className="artis">
              {artist.map((artis, i) => (
                <CartItemsArtis artis={artis} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {album.length > 0 ? (
          <div className="list">
            <h1>Album</h1>
            <div className="album">
              {album.map((artis, i) => (
                <CartItemsAlbum artis={artis} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    </section>
  );
};

export default Finding;
