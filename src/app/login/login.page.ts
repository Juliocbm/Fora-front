import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/usuario';//IMPORTAMOS NUESTRO MODELO DE USUARIO
import { GLOBAL } from '../services/global.service';
import { UsuarioService } from '../services/usuario.service';
import { ToastController } from '@ionic/angular';


@Component({
	selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
	providers:[UsuarioService]
})

export class LoginPage{
	public title:String;
	public user:User; //MODELO DE USUARIO
	public identity;
	public token;
	public status:string;

	constructor(private toastController: ToastController, private _route:ActivatedRoute, private _router:Router,private _userService:UsuarioService){
		this.title = 'Login';
		this.user = new User('','','','','','ROLE_USER','','','',true,'');
	}//constructor

	

	
	async presentToast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1000
    });
    toast.present();
  }
	
	onSubmit(login_form){
		
		console.log(this.user);
		//PARA EL LOGIN Y OBTENER SUS DATOS
		this._userService.signup(this.user).subscribe(
			response => {
				console.log(response.user);
				if(response.user.status==true){
					 
					 this.identity = response.user; //GUARDAMOS EL USUARIO LOGUEADO
					
				if(!this.identity || !this.identity._id ){
					
					this.presentToast('El usuario no se ha logueado correctamente');
				}else{
					//this.identity.password = '';
					
					localStorage.setItem('identity',JSON.stringify(this.identity)); //GUARDAMOS LOS DATOS DEL USUARIO EN EL LOCALSTORAGE

					//PARA OBTENER EL TOKEN UNA VEZ QUE ESTA LOGUEADO EL USAURIO
					this._userService.signup(this.user,'true').subscribe(
						response => {

							this.token = response.token; //GUARDAMOS EL TOKEN
							if(this.token.length <= 0){
								alert('El token no se ha generado');
								this.presentToast('El usuario no se ha logueado correctamente');
							}else{
								localStorage.setItem('token',this.token); //GUARDAMOS EL TOKEN EN EL LOCALSTORAGE
								this.status = 'success';
								
								
								this.identity=this._userService.getIdentity();
								var name=this.identity.name.toUpperCase();
								this.presentToast('Bienvenido '+name);
								login_form.reset();
								this._router.navigate(['/']);
								
							}
						},
						error =>{
							console.log(<any>error);
						}

					);
				}//else
					 }
				else if(response.user.status==false){
								
					this.presentToast('tu usuario ah sido deshabilitado por incumplir las reglas de uso, para una reclamacion manda un email.');
								}

			},
			error =>{
				var errorMessage = <any>error;

				if(errorMessage != null){
					var body = JSON.parse(error._body);
					this.status = 'error';
					this.presentToast('El usuario ó contraseña es incorrecto.');
				}
			}
		);
	}//onSubmit

}//LoginComponent