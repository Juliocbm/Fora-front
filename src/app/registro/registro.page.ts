import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/usuario';//IMPORTAMOS NUESTRO MODELO DE USUARIO
import { GLOBAL } from '../services/global.service';
import { UsuarioService } from '../services/usuario.service';
import { ToastController } from '@ionic/angular';

//Interface para especificar el modelo necesario para llenar los combobox.
export interface Selector {
	//valor que tomara el combobox al seleccionar una opcion.
  value: string;
	
	//texto para mostrar en las opciones del combobox.
  viewValue: string;
}


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  providers:[UsuarioService]
})

export class RegistroPage implements OnInit{
	public title:String;
	public user:User; //MODELO DE USUARIO
	public status:string;
	public sector:string;
	public municipio:string;
	public localidad:string;
	

	

  constructor(public toastController: ToastController, private _route:ActivatedRoute, private _router:Router, private _userService:UsuarioService) { 
		this.title = 'Registro';
		this.user = new User('','','','','','ROLE_USER','','','',true,'');
	}

	ngOnInit(){
			console.log('register.component cargado!');
		}//ngOnInit

		onSubmit(registerForm){

		this.user.image="data:image/jpeg;base64,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";
		this._userService.register(this.user).subscribe(
				response => {
					if(response.user && response.user._id){
						this.status = 'success';
						this.user = new User('','','','','','ROLE_USER','','','',true,''); //REINCIAR EL USUARIO UNA VEZ QUE SE REGISTRE
						registerForm.reset();//ESTO ES PARA REINICAR EL FORMULARIO Y NO SALGAN LOS AVISOS DE LAS VALIDACIONES DEL CAMPO
						this.presentToast('Perfil creado con exito.');
						this._router.navigate(['/login']);
						
						
					}else{
						this.status = 'Error';
						this.presentToast('No se pudo crear tu perfil.');
					}
				},
				error => {
					console.log(<any>error);
				}
			);
	}//onSubmit
	
	async presentToast(msj) {
							const toast = await this.toastController.create({
								message: msj,
								duration: 3000
							});
							toast.present();
						}
	
}//class
