import React, { useState, useEffect } from "react";
import { useSerLibrary } from "../context/UserLibraryContext";
import { useSearch } from "../context/SearchContext";
import HomeRecommendation from "../components/songs/homeRecommendation";
import { usePlayMusic } from "../context/PlayMusicContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { tracksUserLibrary } = useSerLibrary();
  const { infoPageHome } = useSearch();
  const { albumsArtistIds } = tracksUserLibrary;
  const { idPlayState, saveIdList, isPlaying, playListState, playAlbum } =
    usePlayMusic();

  const navigate = useNavigate();
  const [listHome, setListHome] = useState([
    "heart",
    "3RQQmkQEvNCY4prGKE6oc5",
    "3AROvUBUe1mMAauVt73kRF",
    "5I20nnpF2Jj6GjUFsk9EG1",
    "18iFxjZugvKhuNNMbLjZJF",
    "4N1fROq2oeyLGAlQ1C1j18",
  ]);

  useEffect(() => {
    addInfoListHome();
  }, []);

  const redirectPage = async (site, id) => {
    if (id === undefined) {
      navigate("/collection", { replace: true });
    } else {
      navigate(`/${site}/${id}`, { replace: true });
    }
  };

  const addInfoListHome = async () => {
    
    const updatedList = await Promise.all(
      listHome.map(async (item) => {
        return item === "heart" ? item : await infoPageHome(item);
      })
    );

    setListHome(updatedList);
  };

  return (
    <section className="home">
      <h1>¡Buenas tardes!</h1>
      <div className="HomeContent">
        {listHome.map((item, i) => (
          <HomeRecommendation
            item={item}
            key={i}
            playAlbum={playAlbum}
            idPlayState={idPlayState}
            saveIdList={saveIdList}
            isPlaying={isPlaying}
            playListState={playListState}
            redirectPage={redirectPage}
          />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
