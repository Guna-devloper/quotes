self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Here’s your daily quote! ✨",
    icon: "/quotes.png", // Change this to your app's icon
    badge: "/quotes.png",
  };

  event.waitUntil(self.registration.showNotification("Daily Quote Reminder", options));
});
