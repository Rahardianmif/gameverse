import { RotateCcw } from "lucide-react";

export default function GameFilter({
  genres = [],
  platforms = [],
  selectedGenre,
  selectedPlatform,
  ordering,
  onGenreChange,
  onPlatformChange,
  onOrderingChange,
  onReset,
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/10 backdrop-blur">
      <div className="grid gap-3 md:grid-cols-4">
        <select
          value={selectedGenre}
          onChange={(event) => onGenreChange(event.target.value)}
          className="gv-input rounded-2xl px-4 py-3 text-sm"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          value={selectedPlatform}
          onChange={(event) => onPlatformChange(event.target.value)}
          className="gv-input rounded-2xl px-4 py-3 text-sm"
        >
          <option value="">All Platforms</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>

        <select
          value={ordering}
          onChange={(event) => onOrderingChange(event.target.value)}
          className="gv-input rounded-2xl px-4 py-3 text-sm"
        >
          <option value="release-desc">Newest Release</option>
          <option value="release-asc">Oldest Release</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="genre-asc">Genre A-Z</option>
          <option value="publisher-asc">Publisher A-Z</option>
        </select>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-slate-200 transition hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
        >
          <RotateCcw size={15} />
          Reset Filter
        </button>
      </div>
    </div>
  );
}