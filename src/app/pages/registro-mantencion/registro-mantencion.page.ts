import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-registro-mantencion',
  templateUrl: './registro-mantencion.page.html',
  styleUrls: ['./registro-mantencion.page.scss'],
})
export class RegistroMantencionPage implements OnInit {
  tipoMantencion!:string;
  fechaMantencion!:string;
  comentarios!:string;
  evidencia!:File;

  vehiculoPatente: String;

  datos_mantenimientos: any[] = [{nombre:""}];
  dato_mantenimiento: String;

  datos_vehiculos: any[] = [{nombre:""}];


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
    if (this.tipoMantencion && this.fechaMantencion && this.evidencia) {
      const formData: FormData= new FormData();
      formData.append ('evidencia', this.evidencia, this.evidencia.name)
    } else {
      console.log('Es necesario completar los campos con *')
    }
  }

}
