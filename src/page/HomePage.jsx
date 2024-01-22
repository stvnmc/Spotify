import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import HomeRecommendation from "../components/songs/homeRecommendation";
import { usePlayMusic } from "../context/PlayMusicContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { infoPageHome } = useSearch();
  const { idPlayState, saveIdList, isPlaying, playListState, playAlbum } =
    usePlayMusic();

  const navigate = useNavigate();

  // Lista de elementos en la página principal
  const [listHome, setListHome] = useState([
    "heart",
    "3RQQmkQEvNCY4prGKE6oc5",
    "3AROvUBUe1mMAauVt73kRF",
    "5I20nnpF2Jj6GjUFsk9EG1",
    "18iFxjZugvKhuNNMbLjZJF",
    "4N1fROq2oeyLGAlQ1C1j18",
  ]);

  useEffect(() => {
    // Cargar información para la lista de la página principal al montar el componente
    addInfoListHome();
  }, []);

  // Redirige a la página correspondiente (colección o página del sitio) según el sitio y la identificación proporcionados
  const redirectPage = async (site, id) => {
    if (id === undefined) {
      navigate("/collection", { replace: true });
    } else {
      navigate(`/${site}/${id}`, { replace: true });
    }
  };

  // Carga la información necesaria para la lista de la página principal
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
        {/* Renderiza los elementos de la lista de la página principal */}
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
