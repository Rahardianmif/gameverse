export function getUniqueValues(games, key) {
  return [...new Set(games.map((game) => game[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function filterAndSortGames(games, { search, genre, platform, ordering }) {
  const keyword = search.trim().toLowerCase();

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      !keyword ||
      game.title?.toLowerCase().includes(keyword) ||
      game.short_description?.toLowerCase().includes(keyword) ||
      game.publisher?.toLowerCase().includes(keyword) ||
      game.developer?.toLowerCase().includes(keyword);

    const matchesGenre = !genre || game.genre === genre;
    const matchesPlatform = !platform || game.platform === platform;

    return matchesSearch && matchesGenre && matchesPlatform;
  });

  return filteredGames.sort((a, b) => {
    if (ordering === "title-asc") return a.title.localeCompare(b.title);
    if (ordering === "title-desc") return b.title.localeCompare(a.title);
    if (ordering === "genre-asc") return (a.genre || "").localeCompare(b.genre || "");
    if (ordering === "publisher-asc") return (a.publisher || "").localeCompare(b.publisher || "");
    if (ordering === "release-asc") return new Date(a.release_date || 0) - new Date(b.release_date || 0);
    return new Date(b.release_date || 0) - new Date(a.release_date || 0);
  });
}

export function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
