// components/game-main-info.tsx
"use client";
import { GameDetails } from "@/types/game-details.types";

export default function GameMainInfo({ game }: { game: GameDetails }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
      <h2 className="text-xl font-semibold mb-2">Información del juego</h2>
      <p><strong>Géneros:</strong> {game.genres.map(g => g.name).join(", ")}</p>
      <p><strong>Plataformas:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
      <p><strong>Fecha de lanzamiento:</strong> {game.released}</p>
      <p><strong>Desarrollador:</strong> {game.developers?.map(d => d.name).join(", ") || "N/A"}</p>
      <p><strong>Website:</strong> <a href={game.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{game.website}</a></p>
    </div>
  );
}
