import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';
import { MenuController } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usernameData: String;
  vehiculoData: String;
  vehiculoPatente: String;
  vehiculoKm: String;
  usernameDataCorreo: String;
  noTieneAuto: boolean;

  entradas_mantenimientos: any[] = [];
  entrada_mantenimiento: String;




  constructor(private afMessaging: AngularFireMessaging ,private router: Router, private apiService: APIService, private menuCtrl: MenuController) {
    this.usernameData="";
    this.vehiculoData="Sin vehiculo";
    this.vehiculoPatente="Sin datos";
    this.vehiculoKm= "Sin datos";
    this.usernameDataCorreo="Registre un mail";
    this.noTieneAuto= true;


    this.entrada_mantenimiento= "";
    // Llama a la función que obtiene el token de FCM y lo envía al servidor
    if (this.apiService.isAuthenticated()) {
      this.requestFCMPermission();
    }
   }

// mostrar elementos a la hora de inicializar la pagina

  ngOnInit() {
    this.apiService.getData('Usuarios/', true)
    .subscribe(response => {
      console.log(response[0])
      this.usernameData= response[0] ["nombre"]
      console.log(response[0])
      this.usernameDataCorreo= response[0] ["email"]

    }, error => {
      console.error('Error en el GET:', error);
    });


    this.apiService.getData('Vehiculos/', true)
      .subscribe(response => {
        if (response[0]) {
          this.noTieneAuto = false
          console.log(response)
          this.vehiculoData = response[0]["modelo"]
          console.log(response)
          this.vehiculoPatente = response[0]["patente"]
          console.log(response)
          this.vehiculoKm = response[0]["kilometraje_actual"]
        }
      }, error => {
        console.error('Error en el GET:', error);
      });

    //inicio fragmenteo de prueba
    const tipo = "HistorialMantenimientos/"
    this.apiService.getData(tipo, true).subscribe(response => {
      console.log('mantenimientos recibidos:', response);
      this.entradas_mantenimientos = response
    }, error => {
      console.error('Error al hacer la petición:', error);
    });


    //fin fragmenteo de prueba 
    this.menuCtrl.enable(true)
  }

  navigateToRegistroVehiculo() {
    this.router.navigate(['/registro-vehiculo'])
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