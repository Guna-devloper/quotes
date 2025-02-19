import React, { useState } from "react";
import quotesData from "../data/quotes";
import { Card, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const QuotesList = ({ addToFavorites }) => {
  const [selectedCategory, setSelectedCategory] = useState("Motivation");

  const shareQuote = (quote) => {
    const encodedQuote = encodeURIComponent(quote);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedQuote}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container className="mt-5 pt-5">  {/* Added `mt-5 pt-5` to fix spacing issue */}
      <h2 className="text-center mb-3">Quotes by Category</h2>
      
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {selectedCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(quotesData).map((category) => (
            <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Row className="justify-content-center">
        {quotesData[selectedCategory].map((quote, index) => (
          <Col md={6} lg={4} key={index} className="mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Text className="text-center">"{quote}"</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-danger" onClick={() => addToFavorites(quote)}>
                      <FaHeart /> Favorite
                    </Button>
                    <Button variant="outline-primary" onClick={() => shareQuote(quote)}>
                      <FaShareAlt /> Share
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuotesList;
