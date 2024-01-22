import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useSerLibrary } from "../context/UserLibraryContext";
import { useSearch } from "../context/SearchContext";

const RightPanel = () => {
  const { infoPageRightPanel } = useSearch();

  const { tracksUserLibrary } = useSerLibrary();

  const { albumsArtistIds } = tracksUserLibrary;

  const [infoSaveList, setInfoSaveList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    saveList();
  }, [albumsArtistIds, tracksUserLibrary]);

  // Función para cargar información de las listas guardadas
  async function saveList() {
    const filteredInfoSaveList = infoSaveList.filter(
      (item) => !albumsArtistIds?.some((album) => album.id === item.id)
    );

    setInfoSaveList((prevState) =>
      prevState.filter((item) => item.id !== filteredInfoSaveList[0]?.id)
    );

    for (const item of albumsArtistIds) {
      if (!infoSaveList.some((res) => res.id === item.id)) {
        try {
          const result = await infoPageRightPanel(item.id);

          setInfoSaveList((prevState) => [...prevState, result]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  }

  // Función para redirigir a la página correspondiente
  const redirectPage = async (site, id) => {
    try {
      navigate(`/${site}/${id}`, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="right-panel">
      <nav className="topNav">
        <Link to="/">
          <GoHome />
        </Link>
        <Link to="/search">
          <BiSearch />
        </Link>
      </nav>
      <nav className="bottom-nav">
        <VscLibrary />

        <Link to="/collection">
          <div className="saveList">
            <AiFillHeart />
          </div>
        </Link>
        {infoSaveList.map((item) => {
          return (
            <div
              onClick={() => redirectPage(item.type, item.id)}
              className={`saveList${item.type} adaptable-background`}
              key={item.id}
              style={{
                backgroundImage: `url(${item.images?.[1]?.url})`,
              }}
            ></div>
          );
        })}
      </nav>
    </header>
  );
};

export default RightPanel;

