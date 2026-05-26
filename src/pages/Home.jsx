import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  Gamepad2,
  Heart,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Container from "../components/common/Container";
import GameGrid from "../components/games/GameGrid";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import { useGames } from "../hooks/useGames";

// sesuaikan nama file gambar kamu
import heroBg from "../assets/gameverse-hero-bg.png";

export default function Home() {
  const { data = [], isLoading, isError } = useGames();

  const latestGames = [...data]
    .sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0))
    .slice(0, 8);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[720px] overflow-hidden border-b border-white/10">
        {/* Custom Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />

        {/* Dark Overlay supaya teks terbaca */}
        <div className="absolute inset-0 bg-slate-950/55" />

        {/* Left Gradient untuk area tulisan */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.98),rgba(2,6,23,0.82),rgba(2,6,23,0.35),rgba(2,6,23,0.10))]" />

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* Decorative glow */}
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-100 shadow-lg shadow-violet-950/30 backdrop-blur-md">
              <Flame size={16} />
              Free-to-play game discovery
            </p>

            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
              Discover your next free game universe.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              GameVerse membantu kamu mencari free-to-play games, melihat detail game,
              screenshot, publisher, developer, platform, dan menyimpan game favorit
              dengan tampilan katalog game yang modern.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/games"
                className="gv-shine group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-violet-100"
              >
                Explore Games
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/favorites"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-black text-slate-100 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-white/10"
              >
                <Heart size={18} />
                View Favorites
              </Link>
            </div>

            {/* Mini Stats */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <HeroStat icon={<Gamepad2 size={18} />} value={data.length} label="Games" />
              <HeroStat icon={<Sparkles size={18} />} value="Free" label="Access" />
              <HeroStat icon={<ShieldCheck size={18} />} value="API" label="Powered" />
            </div>
          </div>
        </Container>
      </section>

      {/* ================= LATEST GAMES ================= */}
      <section className="relative py-14">
        <Container>
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-violet-300">
                <Gamepad2 size={16} />
                Fresh Releases
              </p>

              <h2 className="text-3xl font-black text-white">
                Latest Free Games
              </h2>

              <p className="mt-2 text-slate-400">
                Data dari FreeToGame API tanpa API key.
              </p>
            </div>

            <Link
              to="/games"
              className="inline-flex items-center gap-2 text-sm font-black text-violet-300 transition hover:text-violet-200"
            >
              See all games
              <ArrowRight size={16} />
            </Link>
          </div>

          {isLoading && <LoadingSkeleton count={8} />}

          {isError && (
            <ErrorMessage message="Gagal memuat data game dari FreeToGame API." />
          )}

          {!isLoading && !isError && <GameGrid games={latestGames} />}
        </Container>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="pb-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Search />}
              title="Debounced Search"
              text="Search lebih efisien tanpa request berlebihan."
            />

            <FeatureCard
              icon={<SlidersHorizontal />}
              title="Filter & Sort"
              text="Filter berdasarkan genre, platform, dan urutan data."
            />

            <FeatureCard
              icon={<Heart />}
              title="Favorites"
              text="Simpan game favorit di localStorage."
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroStat({ icon, value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md">
      <div className="mb-3 flex text-violet-200">{icon}</div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/[0.06]">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/15 text-violet-300 transition group-hover:bg-violet-500 group-hover:text-white">
        {icon}
      </div>

      <h3 className="font-black text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}