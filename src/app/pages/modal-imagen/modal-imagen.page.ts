import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.page.html',
  styleUrls: ['./modal-imagen.page.scss'],
})
export class ModalImagenPage implements OnInit {
  @Input() imagenUrl: string = ''; // Aquí se recibirá la URL de la imagen

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
