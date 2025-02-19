const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendQuoteReminder = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const tokens = await admin.firestore().collection("users").get();
  const registrationTokens = tokens.docs.map(doc => doc.data().fcmToken);

  const message = {
    notification: {
      title: "Daily Quote Reminder",
      body: "Here’s your daily quote to inspire you!",
    },
    tokens: registrationTokens,
  };

  await admin.messaging().sendMulticast(message);
  console.log("Daily quote notifications sent!");
});
