import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  dato_username: String;
  dato_password: String;

  constructor(private fb: FormBuilder, private apiService: APIService, public toastController: ToastController, private router: Router) { 
    this.dato_username= "";
    this.dato_password= "";
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


onClickPostData() {
    //El formulario no se envía en caso de ser no ser valido
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }; 
    //Asignación de valores del formulario
    this.dato_username = this.loginForm.get('correo')?.value;
    this.dato_password = this.loginForm.get('password')?.value;



    // const data = { nombre: 'Felipe', mensaje: 'Hola desde Ionic' };
    const data = {
      username: this.dato_username, email: this.dato_username, password: this.dato_password

    };
    console.log (JSON.stringify(data))


    // aqui se asocia el "tipo" a la tabla que corresponde
    const tipo = "api/token/"

    this.apiService.postData(tipo, data).subscribe(response => {
      console.log('Respuesta del POST:', response);
      this.presentToast("Usuario creado correctamente"); //Mensaje para el usuario
      this.apiService.setToken(response["access"])
      this.router.navigate(["perfil/"])
    }, error => {
      console.error('Error en el POST:', error);
      this.presentToast("Error, no se pudo crear el usuario");//Mensaje para el usuario
    });

    //El formulario al enviarse queda en blanco
    this.loginForm.reset();
  }



  //Validación del Formulario
  public loginForm: FormGroup = this.fb.group({

    correo: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', Validators.required],
  
  });

  //Validación del formulario
  isValidField(field: string): boolean | null {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }
  //Mensajes de error para el usuario
  getFieldError(field: string): string | null {

    if (!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido!';

        case 'pattern':
          return `El correo no es valido.`;

      }
    }

    return '';
  }

}
