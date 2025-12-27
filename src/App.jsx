import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Search } from "./components/Search.jsx";
import Home from "./components/Home.jsx";
import { MovieIdInfo } from "./components/movieInfo.jsx";
import { TVIdInfo } from "./components/tvInfo.jsx";
import Snowfall from "react-snowfall";
import WatchMovie from "./components/watchMovie.jsx";
import WatchTV from "./components/watchTV.jsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 100;
      const heightThreshold = window.outerHeight - window.innerHeight > 100;

      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = "";
        console.warn("DevTools detected!");
      }
    };

    window.addEventListener("resize", checkDevTools);
    checkDevTools(); // run on load

    return () => window.removeEventListener("resize", checkDevTools);
  }, []);
  return (
    <BrowserRouter>
      <div style={{ height: "100vh", width: "100vw", background: "#f0b100" }}>
        <Snowfall color="#0f172b" />

        <div className="bg-slate-950 min-h-screen">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movieInfo/:id" element={<MovieIdInfo />} />
            <Route path="/tvInfo/:id" element={<TVIdInfo />} />
            <Route path="/watch/:id" element={<WatchMovie />} />
            <Route path="/watch/:id/:season/:episode" element={<WatchTV />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
