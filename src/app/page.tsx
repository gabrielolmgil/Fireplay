"use client";

import { useEffect, useState } from "react";
import { getSearchedGames } from "../lib/requests";
import GameCard from "../components/card";
import { Game } from "../types/games.types";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async (query: string) => {
    const result = await getSearchedGames(query);
    setGames(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames(search);
  };

  useEffect(() => {
    fetchGames(""); // carga inicial
  }, []);

  return (
    <main className="p-8 flex flex-col items-center">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar juegos..."
          className="flex-1 p-2 border rounded w-300"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Buscar
        </button>
      </form>

      {/* Resultados de juegos */}
      <section className="grid grid-cols-1 md:grid-cols-4 w-3/4 gap-6">
        {games.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>
    </main>
  );
}
