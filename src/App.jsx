import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Search } from "./components/Search.jsx";
import Home from "./components/Home.jsx";
import { MovieIdInfo } from "./components/MOVIE/movieInfo.jsx";
import { TVIdInfo } from "./components/TV/tvInfo.jsx";
import Snowfall from "react-snowfall";
import WatchMovie from "./components/MOVIE/watchMovie.jsx";
import WatchTV from "./components/TV/watchTV.jsx";
import { MovieSearch } from "./components/MOVIE/movieSearch";
import MovieSction from "./components/MOVIE/MovieSction.jsx";

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100vh", width: "100vw", background: "#f0b100" }}>
        <Snowfall color="#0f172b" />

        <div className="bg-slate-950 min-h-screen  ">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movieInfo/:id" element={<MovieIdInfo />} />
            <Route path="/tvInfo/:id" element={<TVIdInfo />} />
            <Route path="/watch/:id" element={<WatchMovie />} />
            <Route path="/watch/:id/:season/:episode" element={<WatchTV />} />
            <Route path="/movies" element={<MovieSction />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
