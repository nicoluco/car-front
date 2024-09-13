import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dato_nombre: String;
  dato_apellido: String;
  dato_email: String;
  dato_password: String;
  dato_password2: String;
  dato_telefono: String;
  
  
  constructor(private apiService: APIService, public toastController: ToastController) {
    this.dato_nombre= "";
    this.dato_apellido= "";
    this.dato_email= "";
    this.dato_password= "";
    this.dato_telefono= "";
    this.dato_password2= "";
   }

   generarTimestamp=(): string=> {
    const fechaActual = new Date(); // Crea un objeto de fecha actual
    return fechaActual.toISOString().replace(/\.\d{3}Z$/, 'Z'); // Convierte a ISO y elimina los milisegundos
}






  restar(numero:number) {
    
  }

  onClickPostData() {
    // const data = { nombre: 'Felipe', mensaje: 'Hola desde Ionic' };
    const data = { nombre:(this.dato_nombre+" "+this.dato_apellido).trim(), email:this.dato_email, password:this.dato_password, telefono:this.dato_telefono, fecha_registro: this.generarTimestamp()};


    // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo="Usuarios/"
    
    this.apiService.postData(tipo, data).subscribe(response => {
      console.log('Respuesta del POST:', response);
      this.presentToast("Usuario creado correctamente");
    }, error => {
      console.error('Error en el POST:', error);
      this.presentToast("Error, no se pudo crear el usuario");
    });
  }

  // para obtener los datos 
  onClickGetData() {

    // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo="Usuarios/"

    this.apiService.getData(tipo).subscribe(response => {
      console.log('Datos recibidos:', response);
    }, error => {
      console.error('Error al hacer la petición:', error);
    });
  }

  ngOnInit() {
  }




  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }

}
