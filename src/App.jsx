import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Reproducion from "./page/Reproducion";
import RigthtPanel from "./components/RigthtPanel";
import NavBar from "./components/NavBar";
import Artist from "./page/Artist";
import Login from "./page/Login";
import Finding from "./page/Finding";
import Footer from "./components/Footer";
import Album from "./page/Album";
import { useEffect, useState } from "react";
import Collection from "./page/Collection";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const spotyCode = urlParams.get("code");

    if (spotyCode) {
      localStorage.setItem("spotifyCode", spotyCode);

      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
    const storedCode = localStorage.getItem("spotifyCode");
    if (storedCode) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {loggedIn ? (
        <>
          <section className="UpperPanel">
            <RigthtPanel />
            <main>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/search" element={<Finding />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/collection" element={<Collection />} />
              </Routes>
              <Footer />
            </main>
          </section>
          <Reproducion />
        </>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
