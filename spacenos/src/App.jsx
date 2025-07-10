import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Pages
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AddItineraryPage from "./pages/AddItineraryPage.jsx";
import FavoriteItineraries from "./pages/FavouriteItineraries.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  if (checkingAuth) return <p>Loading...</p>; // show loading while checking auth

  return (
    <Router>
      <Routes>
        {/* Protected routes */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        
        <Route
          path="/add-itinerary"
          element={user ? <AddItineraryPage /> : <Navigate to="/login" />}
        />
        <Route path="/favorites" element={<FavoriteItineraries />} />

        {/* Public routes */}
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
