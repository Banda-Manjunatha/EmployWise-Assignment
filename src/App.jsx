// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/users"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/users" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
