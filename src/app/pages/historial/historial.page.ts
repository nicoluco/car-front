import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { ModalController } from '@ionic/angular';
import { ModalImagenPage } from '../modal-imagen/modal-imagen.page';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  entradas_mantenimientos: any[] = [];
  entrada_mantenimiento: String;

  constructor(private apiService: APIService, private modalController: ModalController) { 

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

  async abrirImagen(imagenUrl: string) {
    const modal = await this.modalController.create({
      component: ModalImagenPage,
      componentProps: {
        imagenUrl: imagenUrl, // Pasar la URL de la imagen
      }
    });
    return await modal.present();
  }

}
