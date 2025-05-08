// app/games/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getGameDetails } from "../../../lib/requests";
import { GameDetails } from "../../../types/game-details.types";
import GameMainImages from "../../../components/game-main-images";
import GameMainInfo from "../../../components/game-main-info";
import Rating from "../../../components/rating";

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    async function fetchGame() {
      const gameData = await getGameDetails(params.slug);
      if (gameData) {
        setGame(gameData);
        const generatedPrice = parseFloat((Math.random() * 40 + 10).toFixed(2)); // 10–50 €
        setPrice(generatedPrice);
      }
    }
    fetchGame();
  }, [params.slug]);

  const handleAddToCart = () => {
    if (!game) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({
      id: game.id,
      name: game.name,
      image: game.background_image,
      price: price,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Juego añadido al carrito");
  };

  if (!game) return <p className="p-6">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

      <GameMainImages game={game} />
      <div className="flex justify-between items-center mt-4">
        <p className="text-xl font-bold text-green-600">€{price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Añadir al carrito
        </button>
      </div>

      <GameMainInfo game={game} />
      <Rating rating={game.rating} />

      <div className="mt-6 prose prose-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>
    </div>
  );
}
