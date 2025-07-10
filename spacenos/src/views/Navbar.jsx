import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert("Error logging out: " + err.message);
    }
  };

  const getInitials = (email) => (email ? email[0].toUpperCase() : "?");

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h2 className="text-xl font-bold flex items-center gap-2">
          🧭 <span>Travel Planner</span>
        </h2>

        {/* Hamburger Button (Mobile) */}
        <div className="sm:hidden">
          <button
            className="text-2xl text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Nav Links (Hidden on mobile unless open) */}
        <div className="hidden sm:flex gap-6 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="hover:underline">
            Favorites
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-semibold">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  getInitials(user.email)
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-blue-600 px-4 pb-4 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:underline"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="hover:underline hover:text-blue-100 transition"
          >
            Favorites
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-semibold">
                  {getInitials(user.email)}
                </div>
                <span>{user.email}</span>
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
