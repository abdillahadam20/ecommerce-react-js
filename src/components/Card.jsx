import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Card = ({ filteredProducts }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add products to the cart.");
      navigate("/login");
      return;
    }
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.isArray(filteredProducts) &&
        filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={`http://localhost:3000${product.image_url}`}
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
                  {product.category ? product.category.name : "No Category"}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                {product.description}
              </p>

              <div className="text-lg font-semibold text-gray-900 mb-2">
                Rp {product.price.toLocaleString()}
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
