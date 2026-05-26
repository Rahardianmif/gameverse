# GameVerse — React + Vite + FreeToGame API

GameVerse adalah aplikasi game discovery berbasis React + Vite menggunakan FreeToGame API.

API ini tidak membutuhkan API key.

## Fitur

- List free-to-play games
- Search game dengan debounce
- Filter genre/category
- Filter platform
- Sort by release date, title, genre, dan publisher
- Pagination client-side
- Detail page dinamis
- Screenshot gallery dari detail API
- Favorite game menggunakan localStorage
- Loading, empty, dan error state
- Responsive UI

## Instalasi

```bash
npm install
npm run dev
```

## API

Base URL:

```txt
https://www.freetogame.com/api
```

Endpoint yang dipakai:

```txt
GET /games
GET /game?id={id}
```

## Route

- `/` Home
- `/games` Explore Games
- `/games/:id` Game Detail
- `/favorites` Favorite Games
