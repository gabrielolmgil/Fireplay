// components/game-main-images.tsx
"use client";
import { GameDetails } from "@/types/game-details.types";

export default function GameMainImages({ game }: { game: GameDetails }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <img src={game.background_image} alt={game.name} className="rounded-lg shadow" />
    </div>
  );
}
