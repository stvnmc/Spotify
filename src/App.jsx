import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Reproducion from "./page/Reproducion";
import Derecha from "./components/Derecha";
import NavBar from "./components/NavBar";
import Artist from "./page/Artist";
import Login from "./page/Login";
import Finding from "./page/Finding";
import Footer from "./components/Footer";
import Album from "./page/Album";
import { useEffect, useState } from "react";

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
            <Derecha />
            <main>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/search" element={<Finding />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/track" />
              </Routes>
              <Footer />
            </main>
            <div class="scroll-personalizado"></div>
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
