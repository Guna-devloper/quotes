import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuotesList from "./components/QuotesList";
import Favorites from "./components/Favorites";
import CustomNavbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import QuoteReminder from "./components/QuoteReminder";
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
          <Route path="/" element={<QuoteReminder />} />
          <Route path="/favorites" element={<Favorites favoriteQuotes={favoriteQuotes} removeFromFavorites={removeFromFavorites} />} />
          <Route path="/quotelist" element={<QuotesList addToFavorites={addToFavorites} />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
