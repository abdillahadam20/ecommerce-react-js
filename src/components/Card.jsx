import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const Card = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.isArray(products) &&
        products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.stock < 10 && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  Low Stock
                </span>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {product.category.name}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                {product.description}
              </p>

              <div className="text-lg font-semibold text-gray-900 mb-2">
                Rp {product.price}
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Card;
