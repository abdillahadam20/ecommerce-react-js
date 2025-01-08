import { Minus, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.category.name}
                    </p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="p-1 hover:bg-gray-200 rounded"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 hover:bg-gray-200 rounded"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="border-t p-4 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>Rp {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Rp {calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
