import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearch } from "../context/SearchContext";
import CartItemsAlbum from "../components/cartItemsAlbum";
import CartItemsArtis from "../components/CartItemsArtis";
import CartItemsTrack from "../components/CartItemsTrack";
import { useNavigate, useSearchParams } from "react-router-dom";

const Finding = () => {
  const { funcionSearch, artists, albums, tracks } = useSearch();
  const navigate = useNavigate();

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

  const ResultadoPrincipal = ({ artist }) => (
    <div className="contStart">
      <h1>Resultado principal</h1>
      <div className="searchMain">
        <div
          className="contImaMain adaptable-background"
          style={{ backgroundImage: `url(${artist.images[2]?.url})` }}
        ></div>
        <h1>{artist.name}</h1>
        <div className="contNameMain">
          <h1>Artist</h1>
        </div>
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
        <nav className="menu">
          <button>Todo</button>
          <button>Artists</button>
          <button>Sons</button>
          <button>Albums</button>
          <button>Playlist</button>
        </nav>
        {artists.length > 0 && <ResultadoPrincipal artist={artists[0]} />}

        {tracks.length > 0 && (
          <div className="contSongs">
            <h1>Canciones</h1>
            <div className="allSong">
              {tracks.map((track, i) => {
                return <CartItemsTrack track={track} key={i} />;
              })}
            </div>
          </div>
        )}
        {artists.length > 0 && (
          <div className="contlist">
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
          <div className="contlist">
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
