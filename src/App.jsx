import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Reproducion from "./page/Reproducion";
import Derecha from "./components/Derecha";
import NavBar from "./components/NavBar";
import Artist from "./page/Artist";
import Login from "./page/Login";
import { useAuth } from "./context/AuthContext";
import Finding from "./page/Finding";

const App = () => {
  const { spotyCode } = useAuth();

  return (
    <BrowserRouter>
      {spotyCode === null ? (
        <Login />
      ) : (
        <>
          <section className="UpperPanel">
            <Derecha />
            <main>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist" element={<Artist />} />
                <Route path="/search" element={<Finding />} />
                <Route path="/track" />
                {/* <Route path="/search" element={<Search />} /> */}
              </Routes>
            </main>
          </section>
          <Reproducion />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
