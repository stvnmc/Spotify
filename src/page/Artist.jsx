import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import SongArtist from "../components/SongArtist";
import { BiPlay } from "react-icons/bi";
import { RiMoreLine } from "react-icons/ri";
import CartItemsArtis from "../components/CartItemsArtis";
import CartItemsAlbums from "../components/CartItemsAlbum";

const Artist = () => {
  const {
    setLoading,
    infoGetArtist,
    artists,
    loading,
    albums,
    tracks,
    artistRelated,
  } = useSearch();

  const navigate = useNavigate();

  async function infoGetPageArtist() {
    try {
      await infoGetArtist(id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    infoGetPageArtist();
  }, []);

  const { id } = useParams();

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`, { replace: true });
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {artists.name && (
            <>
              <div
                className="contMainArtis adaptable-background"
                style={{ backgroundImage: `url(${artists.images[0].url})` }}
              >
                <h1>{artists.name}</h1>
                <h1>{artists.followers.total} followers</h1>
              </div>
              <div className="play-like-more">
                <div className="play-music">
                  <BiPlay />
                </div>
                <div className="like-more">
                  <div>
                    <h1>seguir</h1>
                  </div>
                  <RiMoreLine />
                </div>
              </div>
              <div>
                <label>Popular</label>
                <div className="">
                  {tracks.map((track) => {
                    return <SongArtist key={track.id} track={track} />;
                  })}
                </div>
              </div>
              <div>
                <h1>Related Artists</h1>
                <div className="artis">
                  {artistRelated.map((artist) => {
                    return (
                      <CartItemsArtis
                        key={artist.id}
                        redirectPage={redirectPage}
                        artist={artist}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <h1>Related Artists</h1>
                <div className="artis">
                  {albums.map((album) => {
                    return (
                      <CartItemsAlbums
                        key={album.id}
                        redirectPage={redirectPage}
                        album={album}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Artist;
