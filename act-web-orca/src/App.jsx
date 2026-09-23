import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { products } from "./data";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.shortDescription
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={filteredProducts}
                categories={categories}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                clearCart={clearCart}
              />
            }
          />

          <Route
            path="/success"
            element={<OrderSuccess />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}