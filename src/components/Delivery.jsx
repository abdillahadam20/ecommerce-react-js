import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const DeliveryAddress = () => {
  const [name, setName] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [detail, setDetail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deliveryAddressId, setDeliveryAddressId] = useState(null);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const handleSubmitAddress = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to submit the delivery address.");
      navigate("/login");
      return;
    }

    const payload = {
      name,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      detail,
    };

    setDeliveryPayload(payload);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/delivery`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from delivery API:", response.data); // Debug response
      const addressId = response.data.data._id; // Ambil ID dari respons
      setDeliveryAddressId(addressId);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit delivery address:", error);
      alert("Failed to submit delivery address. Please try again.");
    }
  };

  const handleProcessOrder = async () => {
    if (!deliveryAddressId) {
      alert(
        "Delivery address is not submitted. Please complete the address first."
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to submit the order.");
      navigate("/login");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      product: item._id,
      qty: item.quantity,
    }));

    const payload = {
      status: "waiting_payment",
      deliveryAddressId,
      deliveryFee: 5000,
      orderItems,
    };

    setOrderPayload(payload);

    try {
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
      console.error("Failed to process order:", error);
      alert("Failed to process order. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Delivery Address
            </h1>
            {!submitted ? (
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="provinsi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Provinsi
                  </label>
                  <input
                    type="text"
                    name="provinsi"
                    id="provinsi"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Provinsi"
                    required
                    value={provinsi}
                    onChange={(e) => setProvinsi(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="kabupaten"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kabupaten
                  </label>
                  <input
                    type="text"
                    name="kabupaten"
                    id="kabupaten"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Kabupaten"
                    required
                    value={kabupaten}
                    onChange={(e) => setKabupaten(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="kecamatan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    name="kecamatan"
                    id="kecamatan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Kecamatan"
                    required
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="kelurahan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kelurahan
                  </label>
                  <input
                    type="text"
                    name="kelurahan"
                    id="kelurahan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Kelurahan"
                    required
                    value={kelurahan}
                    onChange={(e) => setKelurahan(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="detail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Detail
                  </label>
                  <input
                    type="text"
                    name="detail"
                    id="detail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Detail"
                    required
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmitAddress}
                >
                  Review Order
                </button>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-semibold">Delivery Address</h2>
                <p>{name}</p>
                <p>{provinsi}</p>
                <p>{kabupaten}</p>
                <p>{kecamatan}</p>
                <p>{kelurahan}</p>
                <p>{detail}</p>
                <h2 className="text-xl font-semibold mt-4">Order Items</h2>
                {cartItems.map((item) => (
                  <div key={item._id} className="mb-2">
                    <p>
                      {item.name} - {item.quantity}
                    </p>
                  </div>
                ))}
                <button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                  onClick={handleProcessOrder}
                >
                  Process to Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryAddress;
