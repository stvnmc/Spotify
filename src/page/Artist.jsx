import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import SongArtist from "../components/SongArtist";
import { BiPlay } from "react-icons/bi";
import { RiMoreLine } from "react-icons/ri";
import CartItemsArtis from "../components/CartItemsArtis";
import CartItemsAlbums from "../components/CartItemsAlbum";
import { usePlayMusic } from "../context/PlayMusicContext";
import { CgPlayPause } from "react-icons/cg";

const Artist = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    setLoading,
    infoGetArtist,
    artists,
    loading,
    albums,
    tracks,
    artistRelated,
  } = useSearch();

  const { saveIdList, playAlbum } = usePlayMusic();

  const { name, images, followers } = artists;

  const [isPlayingAlbum, setIsPlayingAlbum] = useState(false);

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

  const redirectPage = (site, id) => {
    navigate(`/${site}/${id}`, { replace: true });
    window.location.reload();
  };

  // render page PopularTracks , RelatedArtists,RelatedAlbums

  const PopularTracks = () => (
    <div className="popular">
      <label>Popular</label>
      <div className="tracks">
        {tracks.map((track, i) => (
          <SongArtist
            key={track.id}
            track={track}
            saveIdList={saveIdList}
            i={i + 1}
          />
        ))}
      </div>
    </div>
  );

  const RelatedArtists = () => (
    <div className="contlist">
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
  );

  const RelatedAlbums = () => {
    <div className="contlist">
      <h1>Related Albums</h1>
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
    </div>;
  };

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div
            className="contMainArtis adaptable-background"
            style={{ backgroundImage: `url(${images?.[0].url})` }}
          >
            <h1>{name}</h1>
            <h1>{followers?.total} followers</h1>
          </div>
          <div className="play-like-more play-follow">
            <div className="play-music">
              {isPlayingAlbum ? (
                <CgPlayPause onClick={() => playAlbum("artist", "pause")} />
              ) : (
                <BiPlay onClick={() => playAlbum("artist", tracks[0].id)} />
              )}
            </div>
            <div className="follow center">
              <h1>follow</h1>
            </div>
            <div className="more center">
              <RiMoreLine />
            </div>
          </div>

          <PopularTracks />

          <RelatedArtists />

          <RelatedAlbums />
        </>
      )}
    </>
  );
};

export default Artist;
