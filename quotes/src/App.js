import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import QuoteReminder from "./components/QuoteReminder";
import QuotesList from "./components/QuotesList";
import Favorites from "./components/Favorites";
import CustomNavbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

const App = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  const addToFavorites = (quote) => {
    if (!favoriteQuotes.includes(quote)) {
      setFavoriteQuotes([...favoriteQuotes, quote]);
    }
  };

  const removeFromFavorites = (quote) => {
    setFavoriteQuotes(favoriteQuotes.filter((q) => q !== quote));
  };

  return (
    <ThemeProvider>
      <Router>
        <CustomNavbar />

        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <QuoteReminder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites favoriteQuotes={favoriteQuotes} removeFromFavorites={removeFromFavorites} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quotelist"
            element={
              <ProtectedRoute>
                <QuotesList addToFavorites={addToFavorites} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
