import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private apiService: APIService, public toastController: ToastController, private fb: FormBuilder, private router: Router) {
    this.dato_nombre = "";
    this.dato_apellido = "";
    this.dato_email = "";
    this.dato_password = "";
    this.dato_telefono = "";
    this.dato_password2 = "";
  }


  ngOnInit() {
  }


  generarTimestamp = (): string => {
    const fechaActual = new Date(); // Crea un objeto de fecha actual
    return fechaActual.toISOString().replace(/\.\d{3}Z$/, 'Z'); // Convierte a ISO y elimina los milisegundos
  }

  onClickPostData() {
    //El formulario no se envía en caso de ser no ser valido
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }; 
    //Asignación de valores del formulario
    this.dato_nombre = this.registroForm.get('name')?.value;
    this.dato_apellido = this.registroForm.get('lastname')?.value;
    this.dato_email = this.registroForm.get('correo')?.value;
    this.dato_telefono = this.registroForm.get('telefono')?.value;
    this.dato_password = this.registroForm.get('contrasena')?.value;
    this.dato_password2 = this.registroForm.get('contrasena2')?.value;

    // const data = { nombre: 'Felipe', mensaje: 'Hola desde Ionic' };
    const data = {
      username: (this.dato_nombre + "_" + this.dato_apellido).trim(), email: this.dato_email, password: this.dato_password, telefono: this.dato_telefono

    };


    // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo = "register/"

    this.apiService.postData(tipo, data).subscribe(response => {
      console.log('Respuesta del POST:', response);
      this.presentToast("Usuario creado correctamente"); //Mensaje para el usuario
      this.router.navigate(["inicio-sesion/"])
    }, error => {
      console.error('Error en el POST:', error);
      this.presentToast("Error, no se pudo crear el usuario");//Mensaje para el usuario
    });

    //El formulario al enviarse queda en blanco
    this.registroForm.reset();
  }

  // para obtener los datos 
  onClickGetData() {

    // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo = "Usuarios/"

    this.apiService.getData(tipo).subscribe(response => {
      console.log('Datos recibidos:', response);
    }, error => {
      console.error('Error al hacer la petición:', error);
    });
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

  //Validación del Formulario
  public registroForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', Validators.required],
    correo: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    telefono: ['', [Validators.required,Validators.minLength(8)]],
    contrasena: ['', [Validators.required,Validators.minLength(6)]],
    contrasena2: ['', Validators.required]
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo('contrasena','contrasena2')
    ]
  });
  //Validación del formulario
  isValidField(field: string):boolean | null {
    return this.registroForm.controls[field].errors && this.registroForm.controls[field].touched;
  }
  //Mensajes de error para el usuario
  getFieldError(field: string):string | null {
    
    if (!this.registroForm.controls[field]) return null;

    const errors = this.registroForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido!';
        
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        
        case 'pattern':
          return `El correo no es valido.`;
        
        case 'notEqual':
          return `¡Las contraseñas no coinciden!`;
      }
    } 

    return '';
  }
  //Validación de contraseñas iguales
  isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

} 
