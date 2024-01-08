import React, { useState } from "react";
import { useSerLibrary } from "../context/UserLibraryContext";
import { useEffect } from "react";

import { AiFillHeart } from "react-icons/ai";
import { useSearch } from "../context/SearchContext";

const HomePage = () => {
  const { tracksUserLibrary } = useSerLibrary();
  const { infoPageHome } = useSearch();
  const { albumsArtistIds } = tracksUserLibrary;
  const [listHome, setListHome] = useState(["heart"]);

  const defaultList = [
    "3RQQmkQEvNCY4prGKE6oc5",
    "3AROvUBUe1mMAauVt73kRF",
    "5I20nnpF2Jj6GjUFsk9EG1",
    "18iFxjZugvKhuNNMbLjZJF",
    "4N1fROq2oeyLGAlQ1C1j18",
  ];

  const addInfoListHome = async () => {
    if (albumsArtistIds) {
      console.log(albumsArtistIds);
      setListHome((prevState) => [...prevState, albumsArtistIds]);
    } else {
    }

    for (const item of listHome) {
      if (item !== "heart") {
        const result = await infoPageHome(item);
        console.log(result);
      }
      //   if (!infoSaveList.some((res) => res.id === item.id)) {
      //     try {
      //       const result = await infoPageRightPanel(item.id);

      //       setInfoSaveList((prevState) => [...prevState, result]);
      //     } catch (error) {
      //       console.error("Error fetching data:", error);
      //     }
      //   }
    }
  };

  useEffect(() => {
    addInfoListHome();
  }, [tracksUserLibrary]);

  return (
    <section className="home">
      <h1>¡Buenas tardes!</h1>
      <div className="HomeContent">
        <div className="contents">
          <div className="saveList imgHome">
            <AiFillHeart />
          </div>
          <div>
            <h1>Canciones que te gustan</h1>
          </div>
          <div></div>
        </div>
        <div className="contents"></div>
        <div className="contents"></div>
        <div className="contents"></div>
        <div className="contents"></div>
        <div className="contents"></div>
      </div>
    </section>
  );
};

export default HomePage;
