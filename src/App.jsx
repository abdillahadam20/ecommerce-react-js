import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Card from "./components/Card";
import Cart from "./components/Cart";
import Delivery from "./components/Delivery";
import Filter from "./components/Filter";
import Hero from "./components/Hero";
import Footer from "./components/Menu/Footer";
import Login from "./components/Menu/Login";
import NavMenu from "./components/Menu/NavMenu";
import Register from "./components/Menu/Register";
import NewsLetter from "./components/NewsLetter";
import ProcessOrder from "./components/ProcessOrder";
import { CartProvider } from "./context/CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CartProvider>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/process-order" element={<ProcessOrder />} />
      </Routes>
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <Filter products={products} setFilteredProducts={setFilteredProducts} />
        <Card filteredProducts={filteredProducts} />
      </main>
      <NewsLetter />
      <Footer />
    </CartProvider>
  );
}

export default App;
