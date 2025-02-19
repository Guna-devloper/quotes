import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Import the theme context

const Favorites = ({ favoriteQuotes, removeFromFavorites }) => {
  const { darkMode } = useTheme(); // Get dark mode state

  const shareQuote = (quote) => {
    const encodedQuote = encodeURIComponent(quote);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedQuote}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container className="mt-5 pt-5"> {/* Added mt-5 and pt-5 to fix spacing */}
      <h2 className={`text-center mb-3 ${darkMode ? "text-light" : "text-dark"}`}>
        Favorite Quotes ❤️
      </h2>

      {favoriteQuotes.length === 0 ? (
        <p className={`text-center ${darkMode ? "text-secondary" : "text-muted"}`}>No favorites yet.</p>
      ) : (
        <Row className="justify-content-center">
          {favoriteQuotes.map((quote, index) => (
            <Col md={6} lg={4} key={index} className="mb-3">
              <Card className={`shadow-sm ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
                <Card.Body>
                  <Card.Text className="text-center">"{quote}"</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant={darkMode ? "outline-light" : "outline-primary"} onClick={() => shareQuote(quote)}>
                      <FaShareAlt /> Share
                    </Button>
                    <Button variant="outline-danger" onClick={() => removeFromFavorites(quote)}>
                      <FaTrash /> Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;
