"use client";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const removeItem = (id: number) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleCheckout = () => {
    alert("¡Gracias por tu compra! (simulada)");
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Carrito de compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-green-600 font-bold">€{item.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Quitar
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">Total: €{total}</div>

          <div className="text-right mt-4">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
