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
  

// Handle Incoming Messages
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});

export { db, auth, messaging };
