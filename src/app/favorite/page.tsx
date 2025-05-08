"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/requests";
import GameCard from "@/components/card"; // Usa el mismo componente de tarjetas

type FavoriteGame = {
  id: number;
  name: string;
  image: string;
  slug: string;
  rating: number;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteGame[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!userId) return;
      const favsRef = collection(db, "users", userId, "favorites");
      const snapshot = await getDocs(favsRef);
      const favs = snapshot.docs.map(doc => doc.data() as FavoriteGame);
      setFavorites(favs);
      setLoading(false);
    };
    loadFavorites();
  }, [userId]);

  if (loading) return <p className="p-6">Cargando favoritos...</p>;

  if (!userId) {
    return <p className="p-6 text-red-600">Inicia sesión para ver tus favoritos.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mis juegos favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes juegos favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map(game => (
            <GameCard
              key={game.id}
              game={{
                id: game.id,
                name: game.name,
                slug: game.slug,
                background_image: game.image,
                rating: game.rating,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
