import { Component } from '@angular/core';
import { APIService } from './api.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private apiService: APIService,
    private afMessaging: AngularFireMessaging  // Inyecta el servicio de mensajería de AngularFire
  ) {
    // Llama a la función que obtiene el token de FCM y lo envía al servidor
    this.requestFCMPermission();
  }

  // Función para obtener el token y enviarlo al servidor
  requestFCMPermission() {
    this.afMessaging.requestPermission
      .pipe()  // Puedes añadir más operadores de RxJS si lo necesitas
      .subscribe(
        () => {
          console.log('Permiso concedido para notificaciones');
          this.afMessaging.getToken.subscribe(
            (token) => {
              if (token) {  // Si el token FCM es válido
                console.log('Token de FCM obtenido:', token);
                this.apiService.sendFCMToken(token).subscribe(
                  response => {
                    console.log('Token FCM enviado correctamente:', response);
                  },
                  error => {
                    console.error('Error al enviar el token FCM:', error);
                  }
                );
              }
            },
            (error) => {
              console.error('Error al obtener el token de FCM:', error);
            }
          );  
        },
        (error) => {
          console.error('Permiso denegado para notificaciones', error);
        }
      );
  }

  // Método para enviar el token al backend
  handleFCMToken(token: string) {
    this.apiService.sendFCMToken(token).subscribe(
      response => {
        console.log('Token FCM enviado correctamente:', response);
      },
      error => {
        console.error('Error al enviar el token FCM:', error);
      }
    );
  }
}