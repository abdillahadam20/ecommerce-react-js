const NewsLetter = () => {
  return (
    <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-600 mb-6">
        Get the latest updates on new products and upcoming sales
      </p>
      <div className="flex max-w-md mx-auto gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
