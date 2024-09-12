import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
})
export class RegistroVehiculoPage implements OnInit {

  constructor(private apiService: APIService) { }

  onClickPostData() {
    // const data = { nombre: 'Felipe', mensaje: 'Hola desde Ionic' };
    const data = { usuario:"http://localhost:8000/Usuarios/1/", marca:"http://localhost:8000/Marcas/1/", modelo:'azul', anio:3000, patente:'plaaaa', kilometraje_actual:1000, fecha_registro:'2024-09-11T23:28:16Z'};


    
    this.apiService.postData(data).subscribe(response => {
      console.log('Respuesta del POST:', response);
    }, error => {
      console.error('Error en el POST:', error);
    });
  }

  // para obtener los datos 
  onClickGetData() {
    this.apiService.getData().subscribe(response => {
      console.log('Datos recibidos:', response);
    }, error => {
      console.error('Error al hacer la petición:', error);
    });
  }

  ngOnInit() {
  }

}
