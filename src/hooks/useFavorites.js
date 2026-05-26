import { useEffect, useState } from "react";

const FAVORITES_KEY = "gameverse_freetogame_favorites";

function getStoredFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function normalizeGame(game) {
  return {
    id: game.id,
    title: game.title,
    thumbnail: game.thumbnail,
    short_description: game.short_description,
    genre: game.genre,
    platform: game.platform,
    publisher: game.publisher,
    developer: game.developer,
    release_date: game.release_date,
    game_url: game.game_url,
  };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(getStoredFavorites);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(game) {
    const favoriteGame = normalizeGame(game);

    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item.id === game.id);
      if (exists) return currentFavorites;
      return [favoriteGame, ...currentFavorites];
    });
  }

  function removeFavorite(gameId) {
    setFavorites((currentFavorites) => currentFavorites.filter((item) => item.id !== gameId));
  }

  function toggleFavorite(game) {
    const exists = favorites.some((item) => item.id === game.id);

    if (exists) {
      removeFavorite(game.id);
    } else {
      addFavorite(game);
    }
  }

  function isFavorite(gameId) {
    return favorites.some((item) => item.id === gameId);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}
