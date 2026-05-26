import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Cpu,
  ExternalLink,
  Gamepad2,
  HardDrive,
  Heart,
  ImageIcon,
  MemoryStick,
  Monitor,
  Play,
  Tag,
  UserRound,
} from "lucide-react";
import Container from "../components/common/Container";
import ErrorMessage from "../components/common/ErrorMessage";
import Badge from "../components/games/Badge";
import { useGameDetail } from "../hooks/useGameDetail";
import { useFavorites } from "../hooks/useFavorites";
import { formatDate } from "../utils/formatDate";

export default function GameDetail() {
  const { id } = useParams();
  const { data: game, isLoading, isError } = useGameDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <section className="py-10">
        <Container>
          <div className="h-[460px] animate-pulse rounded-[2.5rem] bg-slate-900/80" />
          <div className="mt-6 h-8 w-1/2 animate-pulse rounded-full bg-slate-900/80" />
          <div className="mt-4 h-36 animate-pulse rounded-[2rem] bg-slate-900/80" />
        </Container>
      </section>
    );
  }

  if (isError || !game?.id) {
    return (
      <section className="py-10">
        <Container>
          <ErrorMessage message="Detail game gagal dimuat." />
        </Container>
      </section>
    );
  }

  const favorite = isFavorite(game.id);
  const screenshots = game.screenshots || [];
  const requirements = game.minimum_system_requirements;

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-40">
        <img
          src={game.thumbnail || "https://placehold.co/1200x700?text=No+Image"}
          alt=""
          className="h-full w-full object-cover blur-2xl"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      <Container className="relative">
        <Link
          to="/games"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-300 backdrop-blur transition hover:border-violet-400/50 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </Link>

        {/* ================= HERO ================= */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="relative h-[320px] md:h-[520px]">
            <img
              src={game.thumbnail || "https://placehold.co/1200x700?text=No+Image"}
              alt={game.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge icon={<Tag size={13} />} label={game.genre} variant="violet" />
                <Badge
                  icon={<Monitor size={13} />}
                  label={game.platform}
                  variant="cyan"
                />
              </div>

              <h1 className="max-w-5xl text-4xl font-black tracking-tight text-white md:text-6xl">
                {game.title}
              </h1>

              <p className="mt-4 max-w-3xl line-clamp-2 text-base leading-7 text-slate-300 md:text-lg">
                {game.short_description ||
                  "Explore this free-to-play game and discover its details."}
              </p>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_340px] md:p-8">
            <main>
              <div className="mb-7 flex flex-wrap gap-3">
                <InfoPill icon={<Calendar size={16} />}>
                  Released {formatDate(game.release_date)}
                </InfoPill>

                <InfoPill icon={<UserRound size={16} />}>
                  {game.developer || "Unknown Developer"}
                </InfoPill>

                <InfoPill icon={<Gamepad2 size={16} />}>
                  {game.publisher || "Unknown Publisher"}
                </InfoPill>
              </div>

              <SectionTitle title="About This Game" />

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 leading-8 text-slate-300">
                {game.description ||
                  game.short_description ||
                  "No description available."}
              </div>

              {requirements && (
                <>
                  <SectionTitle
                    title="Minimum System Requirements"
                    className="mt-9"
                  />

                  <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300 md:grid-cols-2">
                    <Spec
                      icon={<Monitor size={17} />}
                      label="OS"
                      value={requirements.os}
                    />
                    <Spec
                      icon={<Cpu size={17} />}
                      label="Processor"
                      value={requirements.processor}
                    />
                    <Spec
                      icon={<MemoryStick size={17} />}
                      label="Memory"
                      value={requirements.memory}
                    />
                    <Spec
                      icon={<Gamepad2 size={17} />}
                      label="Graphics"
                      value={requirements.graphics}
                    />
                    <Spec
                      icon={<HardDrive size={17} />}
                      label="Storage"
                      value={requirements.storage}
                    />
                  </div>
                </>
              )}

              <SectionTitle title="Screenshots" className="mt-9" />

              {screenshots.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {screenshots.slice(0, 6).map((item) => (
                    <a
                      key={item.id}
                      href={item.image}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900"
                    >
                      <img
                        src={item.image}
                        alt={`${game.title} screenshot`}
                        className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/30" />
                      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                        <ImageIcon size={14} />
                        View Image
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-400">
                  Screenshot belum tersedia.
                </div>
              )}
            </main>

            {/* ================= SIDEBAR ================= */}
            <aside className="space-y-5">
              <button
                type="button"
                onClick={() => toggleFavorite(game)}
                className={`gv-shine flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black transition ${
                  favorite
                    ? "bg-pink-500 text-white hover:bg-pink-600"
                    : "bg-violet-500 text-white hover:bg-violet-600"
                }`}
              >
                <Heart size={18} fill={favorite ? "currentColor" : "none"} />
                {favorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              {game.game_url && (
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noreferrer"
                  className="gv-shine flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black text-slate-950 transition hover:bg-violet-100"
                >
                  <Play size={18} fill="currentColor" />
                  Play / Official Page
                  <ExternalLink size={16} />
                </a>
              )}

              <InfoBox title="Game Info">
                <InfoRow label="Publisher" value={game.publisher} />
                <InfoRow label="Developer" value={game.developer} />
                <InfoRow label="Genre" value={game.genre} />
                <InfoRow label="Platform" value={game.platform} />
                <InfoRow label="Status" value={game.status} />
              </InfoBox>

              <InfoBox title="Release">
                <InfoRow label="Release Date" value={formatDate(game.release_date)} />
                <InfoRow label="Game ID" value={game.id} />
              </InfoBox>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionTitle({ title, className = "" }) {
  return (
    <h2 className={`mb-4 text-2xl font-black text-white ${className}`}>
      {title}
    </h2>
  );
}

function InfoPill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-slate-300">
      {icon}
      {children}
    </span>
  );
}

function InfoBox({ title, children }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur">
      <h3 className="mb-4 font-black text-white">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-semibold text-slate-200">
        {value || "-"}
      </span>
    </div>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
      <div className="mb-3 flex items-center gap-2 text-violet-200">
        {icon}
        <p className="text-xs font-black uppercase tracking-wide">{label}</p>
      </div>
      <p className="leading-6 text-slate-300">{value || "-"}</p>
    </div>
  );
}