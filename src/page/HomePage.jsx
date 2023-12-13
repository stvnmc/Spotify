import React from "react";
import { useSerLibrary } from "../context/UserLibraryContext";
import { useEffect } from "react";

const HomePage = () => {
  const { saveUserLibrary, tracksUserLibrary, deleteUserLibrary } =
    useSerLibrary();

  useEffect(() => {
    console.log(tracksUserLibrary);
  }, [tracksUserLibrary]);

  return (
    <section className="home">
      <h1>¡Buenas tardes!</h1>
    </section>
  );
};

export default HomePage;
