import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BiPlay } from "react-icons/bi";
import { useSearch } from "../context/SearchContext";
import CartItemsAlbum from "../components/cartItemsAlbum";
import CartItemsArtis from "../components/CartItemsArtis";
import SongFinding from "../components/songs/SongFinding";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePlayMusic } from "../context/PlayMusicContext";
import Loading from "./Loading";

const Finding = () => {
  // Obtén funciones y datos necesarios desde el contexto de búsqueda y reproducción de música
  const { funcionSearch, artists, albums, tracks, loading } = useSearch();
  const { saveIdList, idPlayState, isPlaying, playAlbum } = usePlayMusic();

  const navigate = useNavigate();

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`);
  };

  // Estado para manejar el cambio en la barra de búsqueda
  const [hovered, setHovered] = useState(false);

  // Obtén y actualiza los parámetros de búsqueda desde la URL
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
  });

  const q = searchParams.get("q");

  useEffect(() => {
    // Llama a la función de búsqueda al cambiar la consulta
    funcionSearch(q);
  }, [q]);

  const handleInputChange = (e) => {
    // Actualiza los parámetros de búsqueda en la URL al cambiar el valor de la barra de búsqueda
    setSearchParams((prev) => {
      prev.set("q", e.target.value);
      return prev;
    });
  };

  // Componente para mostrar el resultado principal (primer artista)
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

  // Componente para mostrar las canciones encontradas
  const TracksMain = () => (
    <div className="contSongs">
      <h1>Canciones</h1>
      <div className="allSong">
        {tracks.map((track, i) => (
          <SongFinding
            track={track}
            key={i}
            saveIdList={saveIdList}
            idPlayState={idPlayState}
            isPlaying={isPlaying}
            playAlbum={playAlbum}
          />
        ))}
      </div>
    </div>
  );

  // Componente para mostrar artistas encontrados
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

  // Componente para mostrar álbumes encontrados
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
      {/* Formulario de búsqueda */}
      <form className="inputSearch">
        <BiSearch />
        <input
          type="text"
          placeholder="¿What do you want to hear?"
          value={q}
          onChange={handleInputChange}
        />
      </form>

      {/* Muestra un indicador de carga si la búsqueda está en progreso */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Muestra el resultado principal y las canciones encontradas */}
          <div className="finding-main">
            {artists.length > 0 && <MainResult artist={artists[0]} />}
            {tracks.length > 0 && <TracksMain />}
          </div>

          {/* Muestra artistas y álbumes encontrados */}
          {artists.length > 0 && <Artists />}
          {albums.length > 0 && <Albums />}
        </>
      )}
    </section>
  );
};

export default Finding;
