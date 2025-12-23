import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center h-10">
      <nav className="flex items-center gap-15 bg-white/10 backdrop-blur-lg rounded-md px-4 shadow-sm ring-1 ring-white/10 font-roboto text-xs text-white">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <Link to="/movie">
          <button>MOVIE</button>
        </Link>

        <Link to="/TV">
          <button>TV</button>
        </Link>

        <Link to="/search">
          <button>
            <Search className="w-5" />
          </button>
        </Link>
      </nav>
    </header>
  );
}
