import { useEffect, useMemo, useState } from "react";
import {
  Gamepad2,
  Loader2,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Container from "../components/common/Container";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import GameGrid from "../components/games/GameGrid";
import GameSearch from "../components/games/GameSearch";
import GameFilter from "../components/games/GameFilter";
import Pagination from "../components/games/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { useGames } from "../hooks/useGames";
import {
  filterAndSortGames,
  getUniqueValues,
  paginate,
} from "../utils/gameFilters";

const PAGE_SIZE = 12;

export default function Explore() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [ordering, setOrdering] = useState("release-desc");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);
  const { data = [], isLoading, isError, isFetching } = useGames();

  const genres = useMemo(() => getUniqueValues(data, "genre"), [data]);
  const platforms = useMemo(() => getUniqueValues(data, "platform"), [data]);

  const filteredGames = useMemo(() => {
    return filterAndSortGames(data, {
      search: debouncedSearch,
      genre,
      platform,
      ordering,
    });
  }, [data, debouncedSearch, genre, platform, ordering]);

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / PAGE_SIZE));
  const paginatedGames = paginate(filteredGames, page, PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, genre, platform, ordering]);

  function resetFilter() {
    setSearch("");
    setGenre("");
    setPlatform("");
    setOrdering("release-desc");
    setPage(1);
  }

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <Container className="relative">
        {/* ================= HEADER ================= */}
        <div className="mb-8 overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-200">
                <Sparkles size={16} />
                Explore Library
              </p>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-5xl">
                Find your next free-to-play game.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                Cari game gratis berdasarkan judul, genre, platform, dan urutan rilis
                dengan tampilan katalog yang lebih modern.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-[420px]">
              <StatCard label="Total Games" value={data.length} />
              <StatCard label="Genres" value={genres.length} />
              <StatCard label="Platforms" value={platforms.length} />
            </div>
          </div>
        </div>

        {/* ================= SEARCH & FILTER ================= */}
        <div className="mb-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <Search size={17} className="text-violet-300" />
            Search Games
          </div>
          <GameSearch value={search} onChange={setSearch} />
        </div>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <SlidersHorizontal size={17} className="text-violet-300" />
            Filter Collection
          </div>

          <GameFilter
            genres={genres}
            platforms={platforms}
            selectedGenre={genre}
            selectedPlatform={platform}
            ordering={ordering}
            onGenreChange={setGenre}
            onPlatformChange={setPlatform}
            onOrderingChange={setOrdering}
            onReset={resetFilter}
          />
        </div>

        {/* ================= CONTENT ================= */}
        {isLoading && <LoadingSkeleton count={12} />}

        {isError && (
          <ErrorMessage message="Gagal memuat data game. Coba refresh halaman atau cek koneksi internet." />
        )}

        {!isLoading && !isError && (
          <>
            <div className="mb-5 flex flex-col justify-between gap-3 rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-400 backdrop-blur md:flex-row md:items-center">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Gamepad2 size={16} className="text-violet-300" />
                <strong className="text-white">{filteredGames.length}</strong>
                games found
              </span>

              {isFetching && (
                <span className="inline-flex items-center gap-2 text-violet-200">
                  <Loader2 size={15} className="animate-spin" />
                  Updating data...
                </span>
              )}
            </div>

            <GameGrid games={paginatedGames} />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() =>
                setPage((currentPage) => Math.max(currentPage - 1, 1))
              }
              onNext={() =>
                setPage((currentPage) =>
                  Math.min(currentPage + 1, totalPages)
                )
              }
            />
          </>
        )}
      </Container>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4 text-center">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}