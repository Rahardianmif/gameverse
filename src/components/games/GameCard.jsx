import { Link } from "react-router-dom";
import { Calendar, Heart, Monitor, Play, Tag } from "lucide-react";
import Badge from "./Badge";
import { formatDate } from "../../utils/formatDate";
import { useFavorites } from "../../hooks/useFavorites";

export default function GameCard({ game }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  return (
    <article className="gv-glow-card group relative rounded-[1.75rem] bg-slate-950">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 shadow-xl shadow-black/25 transition duration-300 group-hover:-translate-y-1 group-hover:border-white/20">
        <Link to={`/games/${game.id}`} className="block">
          <div className="relative h-52 overflow-hidden bg-slate-800">
            <img
              src={game.thumbnail || "https://placehold.co/600x400?text=No+Image"}
              alt={game.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90" />

            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              <Badge icon={<Tag size={12} />} label={game.genre} variant="violet" />
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            toggleFavorite(game);
          }}
          className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-xl transition ${
            favorite
              ? "border-pink-300/70 bg-pink-500 text-white shadow-lg shadow-pink-950/40"
              : "border-white/20 bg-black/35 text-white hover:border-pink-300/70 hover:bg-pink-500"
          }`}
          aria-label="Toggle favorite"
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>

        <div className="space-y-4 p-5">
          <div>
            <Link to={`/games/${game.id}`}>
              <h3 className="line-clamp-2 text-lg font-black leading-snug text-white transition group-hover:text-violet-200">
                {game.title}
              </h3>
            </Link>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
              {game.short_description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge icon={<Monitor size={12} />} label={game.platform} variant="cyan" />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {formatDate(game.release_date)}
            </span>
          </div>

          <Link
            to={`/games/${game.id}`}
            className="gv-shine flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-violet-100"
          >
            <Play size={16} fill="currentColor" />
            View Detail
          </Link>
        </div>
      </div>
    </article>
  );
}