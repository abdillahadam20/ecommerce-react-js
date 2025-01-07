import { CiFilter } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

const Filter = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <CiFilter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      <select className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        <option>Sort by: Featured</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Best Rating</option>
      </select>
    </div>
  );
};

export default Filter;
