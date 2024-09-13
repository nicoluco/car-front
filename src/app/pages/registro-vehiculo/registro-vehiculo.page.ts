import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
})
export class RegistroVehiculoPage implements OnInit {
  dato_annio: String;
  dato_modelo: String;
  dato_patente: String;
  dato_kilometraje: String;

  datos_marcas: any[] = [];
  dato_marca: String;

  constructor(private apiService: APIService) { 
    this.dato_annio= "";
    this.dato_modelo= "";
    this.dato_patente= "";
    this.dato_kilometraje= "";
    this.dato_marca= "";
  }

  onClickPostData() {
    // const data = { nombre: 'Felipe', mensaje: 'Hola desde Ionic' };
    const data = { usuario:"http://localhost:8000/Usuarios/1/", marca:"http://localhost:8000/Marcas/"+this.dato_marca+"/", modelo:this.dato_modelo, anio: this.dato_annio, patente:this.dato_patente, kilometraje_actual:this.dato_kilometraje, fecha_registro:'2024-09-11T23:28:16Z'};


    // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo="Vehiculos/"
    
    this.apiService.postData(tipo, data).subscribe(response => {
      console.log('Respuesta del POST:', response);
    }, error => {
      console.error('Error en el POST:', error);
    });
  }

  // para obtener los datos 
  onClickGetData() {
     // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo="Vehiculos/"
    this.apiService.getData(tipo ).subscribe(response => {
      console.log('Datos recibidos:', response);
    }, error => {
      console.error('Error al hacer la petición:', error);
    });
  }

  ngOnInit() {
    const tipo="Marcas/"
    this.apiService.getData(tipo ).subscribe(response => {
      console.log('Datos recibidos:', response);
      this.datos_marcas= response
    }, error => {
      console.error('Error al hacer la petición:', error);
    });

  }

}
