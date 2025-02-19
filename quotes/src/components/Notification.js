import React, { useEffect } from "react";
import { requestNotificationPermission } from "../firebaseConfig";

const Notification = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return <div>Notifications are enabled!</div>;
};

export default Notification;
