import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center">
      <nav
        className="
      flex items-center gap-8
      px-6 py-3
      bg-slate-900/10
      backdrop-blur-xl
      rounded-full
      shadow-[0_10px_30px_rgba(0,0,0,0.45)]
      ring-1 ring-white/10
      text-white text-xs font-semibold tracking-widest
    "
      >
        {[
          { label: "HOME", to: "/" },
          { label: "MOVIE", to: "/movie" },
          { label: "TV", to: "/tv" },
        ].map((item) => (
          <Link key={item.label} to={item.to}>
            <button
              className="
            relative
            px-3 py-1.5
            transition-all duration-300
            text-white/70
            hover:text-white
            after:absolute after:inset-x-0 after:-bottom-1
            after:h-0.5 after:bg-amber-400
            after:scale-x-0 after:origin-left
            after:transition-transform after:duration-300
            hover:after:scale-x-100
          "
            >
              {item.label}
            </button>
          </Link>
        ))}

        <Link to="/search">
          <button
            className="
          ml-2
          flex items-center justify-center
          w-9 h-9
          rounded-full
          bg-white/10
          hover:bg-amber-400/20
          transition-all duration-300
          ring-1 ring-white/10
        "
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </Link>
      </nav>
    </header>
  );
}
