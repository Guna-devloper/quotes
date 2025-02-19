import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Import dark mode context
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

const QuoteReminder = () => {
  const [time, setTime] = useState(localStorage.getItem("reminderTime") || "");
  const [customQuote, setCustomQuote] = useState("");
  const [favoriteQuotes, setFavoriteQuotes] = useState(
    JSON.parse(localStorage.getItem("favoriteQuotes")) || []
  );
  const { darkMode } = useTheme(); // Get dark mode state

  const scheduleNotification = () => {
    if (!time) {
      toast.error("Please select a time for the reminder! ⏰");
      return;
    }

    localStorage.setItem("reminderTime", time);

    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const delay = reminderTime - now;
    console.log(`Notification scheduled in ${delay / 1000} seconds`);

    setTimeout(() => {
      const finalQuote = customQuote || getRandomQuote();
      showNotification("Daily Quote Reminder", finalQuote);
    }, delay);

    toast.success("Reminder set successfully! ✅");
  };

  const getRandomQuote = () => {
    if (favoriteQuotes.length === 0) {
      return "Here’s your daily dose of inspiration! ✨";
    }
    const randomIndex = Math.floor(Math.random() * favoriteQuotes.length);
    return favoriteQuotes[randomIndex];
  };

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else {
      alert("Please allow notifications to receive reminders!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card
        style={{ width: "100%", maxWidth: "400px" }}
        className={`p-4 shadow-lg text-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      >
        <h4 className="mb-4 fw-bold">📅 Set Daily Quote Reminder</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-center p-2 rounded"
              style={{ fontSize: "1rem" }}
            />
          </Form.Group>

          {/* Custom Quote Input Field */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a custom quote (optional)"
              value={customQuote}
              onChange={(e) => setCustomQuote(e.target.value)}
              className="text-center p-2 rounded"
              style={{ fontSize: "1rem" }}
            />
          </Form.Group>

          <Button
            variant={darkMode ? "outline-light" : "primary"}
            onClick={scheduleNotification}
            className="w-100 d-flex align-items-center justify-content-center py-2"
          >
            <FaBell className="me-2" /> Set Reminder
          </Button>
        </Form>
      </Card>

      {/* React Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default QuoteReminder;
