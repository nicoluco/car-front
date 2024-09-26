import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';

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




  constructor(private router: Router,private apiService: APIService) {
    this.usernameData="";
    this.vehiculoData="Sin vehiculo";
    this.vehiculoPatente="Sin datos";
    this.vehiculoKm= "Sin datos";
    this.usernameDataCorreo="Rgistre un mail";
    this.noTieneAuto= true;


    this.entrada_mantenimiento= "";

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
          this.noTieneAuto= false
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
    this.apiService.getData(tipo).subscribe(response => {
      console.log('mantenimientos recibidos:', response);
      this.entradas_mantenimientos = response
    }, error => {
      console.error('Error al hacer la petición:', error);
    });


//fin fragmenteo de prueba    
  }

  navigateToRegistroVehiculo() {
    this.router.navigate(['/registro-vehiculo'])
  }
}