import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import {map} from 'rxjs/operators'; .pipe(map(res => res.json()));  
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global.service';

@Injectable({ providedIn: 'root' })

export class UsuarioService {
	public url:string;
	public identity;
	public token;
	
	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}//constructor

	//METODO QUE MANDA A LLAMAR LA ACCION DEL BACKEND PARA EL REGISTRO DEL USUARIO
	register(usuario_registrar){
		let params = JSON.stringify(usuario_registrar);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'register',params,{headers:headers})
			.map(res => res.json());
	}//register

	//METODO QUE MANDA A LLAMAR LA ACCION DEL BACKEND PARA EL INGRESO A LA APLICACIÓN
	signup(user_logueado, gettoken=null){
		console.log("intento de logueo");
		if(gettoken != null){
			user_logueado.gettoken = gettoken;
		}

		let params = JSON.stringify(user_logueado);
		console.log(user_logueado);
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'login',params,{headers:headers})
			.map(res => res.json());
	}//signup

	//METODO PARA OBTENER LOS DATOS DEL USUARIO DEL LOCALSTORAGE
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));//OBTENEMOS LOS DATOS DEL USUARIO EN FORMATO JSON
		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}//getIdentity

	//METODO PARA OBTENER EL TOKEN DEL LOCALSTORAGE
	getToken(){
		let token = localStorage.getItem('token');//OBTENEMOS EL TOKEN ALMACENADO EN EL LOCALSTORAGE
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}//getToken
	
	getUsuarios(){

		return this._http.get(this.url + '/usuarios'/*,options*/).map(res => res.json());
	}

	updateUser(user_update){
		
		let params = JSON.stringify(user_update);
		let headers = new Headers({'Content-Type':'application/json', 'Authorization':this.getToken()});
		
		console.log(headers);
		return this._http.put(this.url+'update-user/'+user_update._id,params,{headers:headers})
			.map(res => res.json());
	}//updateUser

}//UserService