import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private apiService: APIService, private fb: FormBuilder, public toastController: ToastController, private router: Router) { 
    this.dato_annio= "";
    this.dato_modelo= "";
    this.dato_patente= "";
    this.dato_kilometraje= "";
    this.dato_marca= "";
  }

  onClickPostData() {
    // const data = { nombre: 'Felipe', mensaje: 'Hola desde Ionic' };
    
    this.dato_annio = this.registroVeForm.get('annio')?.value;
    this.dato_modelo = this.registroVeForm.get('modelo')?.value;
    this.dato_patente = this.registroVeForm.get('patente')?.value;
    this.dato_kilometraje = this.registroVeForm.get('kmActual')?.value;
    this.dato_marca = this.registroVeForm.get('marca')?.value;
    
    const data = {marca:"http://localhost:8000/Marcas/"+this.dato_marca+"/", modelo:this.dato_modelo, anio: this.dato_annio, patente:this.dato_patente, kilometraje_actual:this.dato_kilometraje, fecha_registro:'2024-09-11T23:28:16Z'};
   
    // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo="Vehiculos/"
    
    this.apiService.postData(tipo, data, true).subscribe(response => {
      console.log('Respuesta del POST:', response);
      this.presentToast("Vehículo creado correctamente"); //Mensaje para el usuario
      this.router.navigate(["perfil/"])
    }, error => {
      console.error('Error en el POST:', error);
      this.presentToast("Error, no se pudo crear vehículo");//Mensaje para el usuario
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


  public registroVeForm: FormGroup = this.fb.group({
    modelo: ['', Validators.required],
    annio: ['', [Validators.required, Validators.minLength(4)]],
    marca: ['', Validators.required],
    patente: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2}[0-9]{4}$|^[a-zA-Z]{4}[0-9]{2}$/)]],
    kmActual: ['', [Validators.required, Validators.min(0)]]

  });

  //Validación del formulario
  isValidField(field: string): boolean | null {
    return this.registroVeForm.controls[field].errors && this.registroVeForm.controls[field].touched;
  }

  //Mensajes de error para el usuario
  getFieldError(field: string): string | null {

    if (!this.registroVeForm.controls[field]) return null;

    const errors = this.registroVeForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido!';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        
        case 'pattern':
          return `Patente no válida`;

      }
    }

    return '';
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
