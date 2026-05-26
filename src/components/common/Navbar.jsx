import { Link, NavLink } from "react-router-dom";
import { Gamepad2, Heart, Sparkles } from "lucide-react";
import Container from "./Container";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/games" },
  { label: "Favorites", path: "/favorites" },
];

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-violet-500 text-white shadow-lg shadow-violet-950/40"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-950/40 transition group-hover:scale-105">
            <Gamepad2 size={22} />
          </span>

          <span>
            <span className="block text-lg font-black tracking-tight text-white">
              GameVerse
            </span>
            <span className="hidden text-xs font-semibold text-slate-500 sm:block">
              Free game discovery
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/favorites"
          className="gv-shine hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-bold text-slate-100 transition hover:border-pink-400/60 hover:bg-pink-500/10 md:flex"
        >
          <Heart size={16} />
          Favorites
        </Link>

        <Link
          to="/games"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-slate-200 transition hover:border-violet-400/60 hover:text-white md:hidden"
          aria-label="Explore games"
        >
          <Sparkles size={18} />
        </Link>
      </Container>

      <div className="border-t border-white/10 md:hidden">
        <Container className="flex items-center gap-2 overflow-x-auto py-3">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </Container>
      </div>
    </header>
  );
}