import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-registro-mantencion',
  templateUrl: './registro-mantencion.page.html',
  styleUrls: ['./registro-mantencion.page.scss'],
})
export class RegistroMantencionPage implements OnInit {
  tipoMantencion!:string;
  seleccionVehiculo!:string;
  fechaMantencion!:string;
  comentarios!:string;
  evidencia!:File;
  datoKilometraje!:string;

  vehiculoPatente: String;

  datos_mantenimientos: any[] = [];
  dato_mantenimiento: String;

  datos_vehiculos: any[] = [];


  constructor(private apiService: APIService) {
    this.dato_mantenimiento= "";
    this.vehiculoPatente="Sin datos";
   }

  ngOnInit() {
    const tipo="Mantenimientos/"
    this.apiService.getData(tipo, true).subscribe(response => {
      console.log('Datos recibidos:', response);
      this.datos_mantenimientos= response
    }, error => {
      console.error('Error al hacer la petición:', error);
    });

    this.apiService.getData('Vehiculos/', true)
      .subscribe(response => {
        if (response) {
          this.datos_vehiculos = response
          console.log(response)
        }
      }, error => {
        console.error('Error en el GET:', error);
      });

  }
  

  onFileSelected(event:any) {
    const file: File = event.target.files[0];
    if (file) {
      this.evidencia = file;
      console.log('Archivo seleccionado:', this.evidencia.name);
    }
  }

  onSubmit() {
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtiene la fecha actual en formato YYYY-MM-DD HH:mm:ss
    if (this.tipoMantencion && this.fechaMantencion && this.evidencia && this.seleccionVehiculo ) {
      const formData: FormData= new FormData();

      

      formData.append ('evidencia', this.evidencia)
      formData.append ('vehiculo', this.seleccionVehiculo)
      formData.append ('mantenimiento', this.tipoMantencion)
      formData.append ('fecha_mantenimiento', this.fechaMantencion.replace(/( |T).*$/,""))
      formData.append ('kilometraje', this.datoKilometraje)
      formData.append ('notas', this.comentarios)
      formData.append ('fecha_registro', fechaActual.replace(/( |T).*$/,""))

    /*   formato de fecha correcto, eliminacion de caracter inecesario */
      console.log(this.fechaMantencion.replace(/( |T).*$/,""))
     



      this.apiService.postData("HistorialMantenimientos/", formData, true).subscribe(response => {
        console.log('Datos recibidos:', response);
        window.location.replace('/historial');
      }, error => {
        console.error('Error al hacer la petición:', error);
        
      });



    } else {
      console.log('Es necesario completar los campos con *')
    }
  }

}
