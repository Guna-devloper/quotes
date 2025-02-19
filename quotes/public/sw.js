self.addEventListener("push", function (event) {
    const options = {
      body: "Here’s your daily quote!",
      icon: "/quotes.png",
    };
    event.waitUntil(self.registration.showNotification("Daily Quote Reminder", options));
  });
  