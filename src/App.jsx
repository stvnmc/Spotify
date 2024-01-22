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
    // Verifica si hay un código de Spotify en los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const spotyCode = urlParams.get("code");

    // Almacena el código de Spotify y actualiza la URL si está presente
    if (spotyCode) {
      localStorage.setItem("spotifyCode", spotyCode);
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    }

    // Comprueba si hay un código almacenado y actualiza el estado de inicio de sesión en consecuencia
    const storedCode = localStorage.getItem("spotifyCode");
    if (storedCode) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {loggedIn ? (
        // Sección para usuarios autenticados
        <>
          <section className="UpperPanel">
            <RigthtPanel />
            <main>
              <NavBar />
              {/* Definición de rutas para la aplicación */}
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
          {/* Componente de reproducción de música */}
          <Reproducion />
        </>
      ) : (
        // Página de inicio de sesión si el usuario no está autenticado
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
