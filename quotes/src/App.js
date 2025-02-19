import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuoteReminder from "./components/QuoteReminder";
import QuotesList from "./components/QuotesList";
import Favorites from "./components/Favorites";
import CustomNavbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Add to favorites
  const addToFavorites = (quote) => {
    if (!favoriteQuotes.includes(quote)) {
      setFavoriteQuotes([...favoriteQuotes, quote]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (quote) => {
    setFavoriteQuotes(favoriteQuotes.filter((q) => q !== quote));
  };

  return (
    <ThemeProvider>
      <Router>
        {/* Navbar (Visible always) */}
        <CustomNavbar />

        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={user ? <Navigate to="/reminder" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/reminder" /> : <Signup />} />

          {/* Protected Routes (User must be logged in) */}
          <Route path="/reminder" element={user ? <QuoteReminder /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={user ? <Favorites favoriteQuotes={favoriteQuotes} removeFromFavorites={removeFromFavorites} /> : <Navigate to="/login" />} />
          <Route path="/quotelist" element={user ? <QuotesList addToFavorites={addToFavorites} /> : <Navigate to="/login" />} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
