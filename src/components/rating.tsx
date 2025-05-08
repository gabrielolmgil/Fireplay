// components/rating.tsx
"use client";
import { Star } from "lucide-react";

export default function Rating({ rating }: { rating: number }) {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center gap-1 mt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)} / 5</span>
    </div>
  );
}
