// Añadir esto antes del return:
const fakePrice = (Math.random() * 40 + 10).toFixed(2); // 10-50 €

const handleAddToCart = (game: { id: string; name: string; background_image: string }) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({
    id: game.id,
    name: game.name,
    image: game.background_image,
    price: parseFloat(fakePrice),
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Juego añadido al carrito");
};
