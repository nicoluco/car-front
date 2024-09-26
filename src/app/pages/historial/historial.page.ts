import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  entradas_mantenimientos: any[] = [];
  entrada_mantenimiento: String;

  constructor(private apiService: APIService) { 

    this.entrada_mantenimiento= "";
  }

  ngOnInit() {

    const tipo = "HistorialMantenimientos/"
    this.apiService.getData(tipo, true).subscribe(response => {
      console.log('mantenimientos recibidos:', response);
      this.entradas_mantenimientos = response
    }, error => {
      console.error('Error al hacer la petición:', error);
    });
  }

}
