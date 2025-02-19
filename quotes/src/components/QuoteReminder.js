import React, { useState, useEffect } from "react";
import { Card, Button, Form, Container, ListGroup } from "react-bootstrap";
import { FaBell, FaTrash } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import toast, { Toaster } from "react-hot-toast";

const QuoteReminder = () => {
  const [time, setTime] = useState("");
  const [customQuote, setCustomQuote] = useState("");
  const [reminders, setReminders] = useState(
    JSON.parse(localStorage.getItem("reminders")) || []
  );
  const { darkMode } = useTheme();

  // ✅ Request Notification Permission
  const requestNotificationPermission = async () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast.success("Notifications enabled! ✅");
      } else {
        toast.error("Please enable notifications in your browser settings! ⚠️");
      }
    } else {
      toast.error("Notifications are not supported on your device. ❌");
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      });
    }
  }, []);

  const scheduleNotification = () => {
    if (!time) {
      toast.error("Please select a time for the reminder! ⏰");
      return;
    }

    const newReminder = { time, quote: customQuote || getRandomQuote() };
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem("reminders", JSON.stringify(updatedReminders));

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
      showNotification("Daily Quote Reminder", newReminder.quote);
    }, delay);

    toast.success("Reminder set successfully! ✅");

    // ✅ Reset input fields after setting the reminder
    setTime("");
    setCustomQuote("");
  };

  const getRandomQuote = () => {
    return "Here’s your daily dose of inspiration! ✨";
  };

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, { body });
      });
    } else {
      requestNotificationPermission();
    }
  };

  const deleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    localStorage.setItem("reminders", JSON.stringify(updatedReminders));
    toast.success("Reminder deleted successfully! ❌");
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Card
        style={{ width: "100%", maxWidth: "400px" }}
        className={`p-4 shadow-lg text-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      >
        <h4 className="mb-4 fw-bold">📅 Set Multiple Quote Reminders</h4>
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

        {/* Display Scheduled Reminders */}
        {reminders.length > 0 && (
          <ListGroup className="mt-4">
            {reminders.map((reminder, index) => (
              <ListGroup.Item
                key={index}
                className={`d-flex justify-content-between align-items-center ${darkMode ? "bg-secondary text-light" : ""}`}
              >
                <span>
                  ⏰ {reminder.time} - {reminder.quote}
                </span>
                <Button variant="danger" size="sm" onClick={() => deleteReminder(index)}>
                  <FaTrash />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>

      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default QuoteReminder;
