import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-md shadow-lg rounded-xl p-4 mb-6 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="NebulaNotes Logo" className="w-12 h-12" />
        <h1 className="text-4xl font-extrabold text-white tracking-wide glow-text">
          NebulaNotes
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Link
          to="/folders"
          className="p-3 w-12 h-12 bg-gray-800 hover:bg-gray-700 transition shadow-md flex items-center justify-center rounded-md"
        >
          <span className="text-white text-xl">📂</span>
        </Link>
        <Link
          to="/starred"
          className="p-3 w-12 h-12 bg-gray-800 hover:bg-gray-700 transition shadow-md flex items-center justify-center rounded-md"
        >
          <span className="text-white text-xl">⭐</span>
        </Link>
        <Link
          to="/settings"
          className="p-3 w-12 h-12 bg-gray-800 hover:bg-gray-700 transition shadow-md flex items-center justify-center rounded-md"
        >
          <span className="text-white text-xl">⚙️</span>
        </Link>
        <Link
          to="/profile"
          className="p-3 w-12 h-12 bg-gray-800 hover:bg-purple-600 transition shadow-md flex items-center justify-center rounded-md"
        >
          <span className="text-white text-xl">👤</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
