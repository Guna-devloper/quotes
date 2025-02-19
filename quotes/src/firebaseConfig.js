import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDG8XxY7atqPg2M7mqJJdugZVuAK6sRbWk",
    authDomain: "quotes-com.firebaseapp.com",
    projectId: "quotes-com",
    storageBucket: "quotes-com.firebasestorage.app",
    messagingSenderId: "24466026645",
    appId: "1:24466026645:web:5c868548b8af4038eceb9c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

// Request Notification Permission & Get Token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, { vapidKey: "BH8I2NA_9bOwz4x_tIHXocHT_WrUsY5UH9Vrt7wgUruiUv4LOVclEeXyiOuZf5pgJ3uPvi-7skuuAYOQs6CcOqs" });
      console.log("FCM Token:", token);
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting permission", error);
  }
};

// Handle Incoming Messages
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});

export { db, auth, messaging };
