import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registrado correctamente:', registration);
    })
    .catch((err) => {
      console.error('Error al registrar el Service Worker:', err);
    });
}

// Luego inicializas la aplicación Angular como de costumbre
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
