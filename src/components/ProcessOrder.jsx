import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { deliveryAddressId } = location.state;
  const { cartItems, clearCart } = useContext(CartContext);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  useEffect(() => {
    const fetchDeliveryAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in to view the order summary.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/delivery/${deliveryAddressId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDeliveryAddress(response.data);
      } catch (error) {
        console.error("Failed to fetch delivery address:", error);
        alert("Failed to fetch delivery address. Please try again.");
      }
    };

    fetchDeliveryAddress();
  }, [deliveryAddressId, navigate]);

  const handleSubmitOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to submit the order.");
        navigate("/login");
        return;
      }

      const orderItems = cartItems.map((item) => ({
        product: item.id,
        qty: item.quantity,
      }));

      const payload = {
        status: "waiting_payment",
        deliveryAddressId,
        deliveryFee: 5000,
        orderItems,
      };

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/orders`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order processed successfully:", orderResponse.data);
      clearCart();
      navigate("/confirmation");
    } catch (error) {
      console.error(
        "Failed to process order:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Failed to process order: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`
      );
    }
  };

  if (!deliveryAddress) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Delivery Address</h2>
        <p>{deliveryAddress.name}</p>
        <p>{deliveryAddress.provinsi}</p>
        <p>{deliveryAddress.kabupaten}</p>
        <p>{deliveryAddress.kecamatan}</p>
        <p>{deliveryAddress.kelurahan}</p>
        <p>{deliveryAddress.detail}</p>
        <p>{deliveryAddress.postalCode}</p>
        <p>{deliveryAddress.country}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Order Items</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="mb-2">
            <p>
              {item.name} - {item.quantity}
            </p>
          </div>
        ))}
      </div>
      <button
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSubmitOrder}
      >
        Submit Order
      </button>
    </div>
  );
};

export default ProcessOrder;
