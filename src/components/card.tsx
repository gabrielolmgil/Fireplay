'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Game } from "../types/games.types";

export default function GameCard({ game }: { game: Game }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.includes(game.id));
  }, [game.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // evita que el Link redirija
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated: number[];

    if (favs.includes(game.id)) {
      updated = favs.filter((id: number) => id !== game.id);
      setIsFavorite(false);
    } else {
      updated = [...favs, game.id];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <Link href={`/game/${game.slug}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative">
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-xl"
          aria-label="Toggle favorito"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold">{game.name}</h3>
        <p className="text-sm text-gray-500">Rating: {game.rating}</p>
      </div>
    </Link>
  );
}
