const Hero = () => {
  return (
    <div className="bg-blue-600 text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Special Sale Up to 50% Off</h1>
        <p className="text-lg mb-6">
          Discover amazing deals on our latest products
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
