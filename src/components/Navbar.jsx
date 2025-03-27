import { Link, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 fixed w-full top-0 flex items-center justify-between shadow-md z-50">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <span className="animate-pulse">EmployWise</span>
      </h1>
      {isAuthenticated && location.pathname !== "/login" && (
        <div className="flex items-center space-x-6">
          <Link
            to="/users"
            className="hover:text-blue-400 flex items-center gap-1 transition-colors duration-300 transform hover:scale-105"
          >
            <FaUser className="animate-bounce" /> Users
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-red-400 flex items-center gap-1 transition-colors duration-300 transform hover:scale-105"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
