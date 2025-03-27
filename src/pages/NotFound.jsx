import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
      <p className="text-xl text-gray-400 mb-6 animate-pulse">
        Oops! Page Not Found
      </p>
      <Link
        to="/users"
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300 animate-fade-in"
      >
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
