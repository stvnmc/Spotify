import React, { useState } from "react";
import { useSerLibrary } from "../context/UserLibraryContext";
import { useEffect } from "react";

import { useSearch } from "../context/SearchContext";
import HomeRecommendation from "../components/songs/homeRecommendation";

const HomePage = () => {
  const { tracksUserLibrary } = useSerLibrary();
  const { infoPageHome } = useSearch();
  const { albumsArtistIds } = tracksUserLibrary;
  const [listHome, setListHome] = useState(["heart"]);

  const defaultInfo = [
    "3RQQmkQEvNCY4prGKE6oc5",
    "3AROvUBUe1mMAauVt73kRF",
    "5I20nnpF2Jj6GjUFsk9EG1",
    "18iFxjZugvKhuNNMbLjZJF",
    "4N1fROq2oeyLGAlQ1C1j18",
  ];

  useEffect(() => {
    addInfoListHome();
  }, []);

  const addInfoListHome = async () => {
    for (const item of defaultInfo) {
      console.log(item);

      const result = await infoPageHome(item);
      setListHome((prevState) => [...prevState, result]);
    }
  };

  return (
    <section className="home">
      <h1>¡Buenas tardes!</h1>
      <div className="HomeContent">
        {listHome?.map((item) => {
          return <HomeRecommendation item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
};

export default HomePage;
