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
import TvSection from "./components/TV/tvSection.jsx";
import disableDevtool from "disable-devtool";
import Footer from "./components/Footer.jsx";
import WatchMovie2 from "./components/MOVIE/watchMovie2.jsx";
import WatchTV2 from "./components/TV/watchTV2.jsx";

//disableDevtool();

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-pattern min-h-screen  ">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movieInfo/:id" element={<MovieIdInfo />} />
          <Route path="/tvInfo/:id" element={<TVIdInfo />} />
          <Route path="/watch/:id" element={<WatchMovie />} />
          <Route path="/movie/main2/:id" element={<WatchMovie2 />} />

          <Route path="/watch/:id/:season/:episode" element={<WatchTV />} />
          <Route
            path="/watch/main2/:id/:season/:episode"
            element={<WatchTV2 />}
          />

          <Route path="/movies" element={<MovieSction />} />
          <Route path="/tv" element={<TvSection />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
