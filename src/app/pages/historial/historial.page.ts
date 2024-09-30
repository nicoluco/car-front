import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalImagenPage } from '../modal-imagen/modal-imagen.page';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  entradas_mantenimientos: any[] = [];
  entrada_mantenimiento: String;

  constructor(private apiService: APIService, private modalController: ModalController, private loadingCtrl: LoadingController) { 

    this.entrada_mantenimiento= "";
  }

  ngOnInit() {
    this.showLoading();
    const tipo = "HistorialMantenimientos/"
    this.apiService.getData(tipo, true).subscribe(response => {
      console.log('mantenimientos recibidos:', response);
      this.entradas_mantenimientos = response
      this.loadingCtrl.dismiss();
    }, error => {
      console.error('Error al hacer la petición:', error);
      this.loadingCtrl.dismiss();
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

  // loading
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: "circular",
      message: 'Cargando...',
      // duration: 3000,
    });

    loading.present();
  }


}
