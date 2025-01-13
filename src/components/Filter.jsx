import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

const Filter = ({ products, setFilteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Featured");

  useEffect(() => {
    let filteredProducts = [...products];

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "Price: Low to High":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filteredProducts);
  }, [searchQuery, sortOption, products, setFilteredProducts]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <CiFilter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      <select
        className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="Featured">Sort by: Featured</option>
        <option value="Price: Low to High">Price: Low to High</option>
        <option value="Price: High to Low">Price: High to Low</option>
      </select>
    </div>
  );
};
Filter.propTypes = {
  products: PropTypes.array.isRequired,
  setFilteredProducts: PropTypes.func.isRequired,
};

export default Filter;
