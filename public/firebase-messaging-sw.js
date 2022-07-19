// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAjljL1SE8qU2IJwhx1qcJ6RFL0UlA2Km8",
    authDomain: "intresting-2cfb2.firebaseapp.com",
    projectId: "intresting-2cfb2",
    storageBucket: "intresting-2cfb2.appspot.com",
    messagingSenderId: "23725437785",
    appId: "1:23725437785:web:d6a185f65db213ccd19248",
    measurementId: "G-G7L5C254VX"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});