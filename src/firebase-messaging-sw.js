importScripts('/assets/firebase-app.js');
importScripts('/assets/firebase-messaging.js');

// Inicializar Firebase en el Service Worker
firebase.initializeApp({
    apiKey: "AIzaSyAszd6Ddo-ui65jNTHugdBGFDXVAyj45wM",
    authDomain: "portafolio-car.firebaseapp.com",
    projectId: "portafolio-car",
    storageBucket: "portafolio-car.appspot.com",
    messagingSenderId: "910148873121",
    appId: "1:910148873121:web:a525bdc95cb913f02a79e0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});