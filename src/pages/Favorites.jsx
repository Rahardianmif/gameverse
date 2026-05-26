import Container from "../components/common/Container";
import GameGrid from "../components/games/GameGrid";
import EmptyState from "../components/common/EmptyState";
import { useFavorites } from "../hooks/useFavorites";
import { Heart, Sparkles, Trash2 } from "lucide-react";

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-60 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <Container className="relative">
        <div className="mb-8 overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-2 text-sm font-bold text-pink-200">
                <Heart size={16} />
                Saved Collection
              </p>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Favorite Games
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                Game yang kamu simpan akan tersimpan di localStorage browser.
                Kamu bisa kembali melihatnya kapan saja dari device yang sama.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:items-center">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 px-5 py-4 text-center">
                <p className="text-2xl font-black text-white">
                  {favorites.length}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Saved Games
                </p>
              </div>

              {favorites.length > 0 && (
                <button
                  type="button"
                  onClick={clearFavorites}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-black text-red-100 transition hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={16} />
                  Clear Favorites
                </button>
              )}
            </div>
          </div>
        </div>

        {favorites.length ? (
          <GameGrid games={favorites} />
        ) : (
          <EmptyState
            title="Belum ada favorite"
            message="Tambahkan game favorit dari halaman Explore atau Detail Game."
          />
        )}

        {favorites.length > 0 && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-slate-400 backdrop-blur">
            <p className="inline-flex items-center gap-2 font-semibold text-slate-300">
              <Sparkles size={16} className="text-violet-300" />
              Catatan
            </p>
            <p className="mt-2">
              Data favorite tersimpan di browser. Jika cache browser dibersihkan
              atau membuka dari device lain, daftar favorite bisa berbeda.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}