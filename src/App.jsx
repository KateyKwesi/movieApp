import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { PlayMovie } from "./components/playMovie.jsx";
import { Search } from "./components/Search.jsx";
import Home from "./components/Home.jsx";
import { IdInfo } from "./components/Info.jsx";
import Snowfall from "react-snowfall";

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100vh", width: "100vw", background: "#282c34" }}>
        <Snowfall />
        {/* Your app content goes here */}

        <div className="bg-slate-950 min-h-screen">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/play/:id" element={<PlayMovie />} />
            <Route path="/info" element={<IdInfo />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
