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
      {artist ? (
        <>
          <nav>
            <button>Todo</button>
            <button>Artists</button>
            <button>Sons</button>
            <button>Albums</button>
            <button>Playlist</button>
          </nav>
          <div className="StartSearch">
            <div className="contStart">
              <h1>Resultado principal</h1>
              <div className="searchMain">
                <img src={artist[0].images[2].url} />
                <h1>{artist[0].name}</h1>
                <div>
                  <h1>Artist</h1>
                </div>
              </div>
            </div>
            <div className="contSongs">
              <h1>Canciones</h1>
              <div className="allSong">
                {track &&
                  track.map((song, i) => {
                    return <CartItemsTrack song={song} key={i} />;
                  })}
              </div>
            </div>
          </div>
          <div>
            <h1>Artis</h1>
            <div className="artis">
              {artist &&
                artist.map((artis, i) => (
                  <CartItemsArtis artis={artis} key={i} />
                ))}
            </div>
          </div>
          <div>
            <h1>Album</h1>
            <div className="album">
              {album &&
                album.map((artis, i) => (
                  <CartItemsAlbum artis={artis} key={i} />
                ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Finding;
