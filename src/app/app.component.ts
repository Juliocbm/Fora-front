import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global.service';
import { User } from './models/usuario';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
	providers:[UsuarioService]
})
export class AppComponent implements OnInit, DoCheck {
	
	 public identity;
  public url:string;
	public user:User;
	
	
	public appPages = [
 
		{
			title: 'acerca de',
			url: '/acerca-de',
			icon: 'information-circle-outline'
		}
  ];
	
	
	public LogPages = [

    {
      title: 'Mis datos',
      url: '/mis-datos',
      icon: 'contact'
    },
		{
      title: 'Viajes',
      url: '/viajes',
      icon: 'cube'
   }

  ];
	
		public RegLogPages = [

    {
      title: 'Registrarse',
      url: '/registro',
      icon: 'person-add'
    },
		{
      title: 'Login',
      url: '/login',
      icon: 'log-in'
   }

  ];
	
	public Salir = [
		{
      title: 'Salir',
      url: '/login',
      icon: 'log-out'
   }

  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
		 private _route:ActivatedRoute, 
		 private _router:Router, 
		 private _userService:UsuarioService,
		 private toastController: ToastController
//		 private fcm:FCM
  ) {
    this.initializeApp();
			this.url = GLOBAL.url;
  }
	
		async presentToast(msj) {
			const toast = await this.toastController.create({
				message: msj,
				duration: 2000
			});
			toast.present();
		}
	


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
	
	ngOnInit(){
  	this.identity = this._userService.getIdentity();
		this.user=this.identity;
  }//ngOnInit

  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }//ngDoCheck

  logout(){
  	localStorage.clear();
  	this.identity = null;
    this._router.navigate(['/']);
  }//logout
	
	
	
}























