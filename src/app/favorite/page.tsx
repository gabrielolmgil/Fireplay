"use client";

import { useEffect, useState } from "react";
import GameCard from "@/components/card";
import { Game } from "@/types/games.types";
import { getGameDetails } from "@/lib/requests"; // función para buscar un juego por ID

export default function FavoritesPage() {
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const favIds: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      const promises = favIds.map((id) => getGameDetails(id.toString())); // suponiendo que acepta string
      const games = await Promise.all(promises);
      setFavoriteGames(games);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  if (loading) return <p className="p-6">Cargando favoritos...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mis juegos favoritos</h1>

      {favoriteGames.length === 0 ? (
        <p>No tienes juegos marcados como favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
