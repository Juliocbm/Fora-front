import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//import {map} from 'rxjs/operators'; .pipe(map(res => res.json()));  
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global.service';

@Injectable({ providedIn: 'root' })

export class ViajeService{
public token;
	public url:string;

	constructor(private _http:Http){
		this.url = GLOBAL.url;
	}//constructor

	//METODO QUE MANDA A LLAMAR LA ACCION DEL BACKEND PARA EL REGISTRO DE UNA NOTICIA
	createViaje(token,nuevo_viaje){
		let params = JSON.stringify(nuevo_viaje);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
            });
            
		return this._http.post(this.url+'add-viaje',params,{headers:headers}).map(res => res.json());
		
		
	}//createViaje


	//METODO QUE MANDA A LLAMAR LA ACCION DEL BACKEND PARA EL REGISTRO DE UNA direccion
	createDireccion(token,nuevaDireccion){
		let params = JSON.stringify(nuevaDireccion);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
            });
            
		return this._http.post(this.url+'add-direccion',params,{headers:headers}).map(res => res.json());
		
		
	}//createViaje
	
	
	getViajes(){
		/*
		ESTO ES POR SI SE LLEGA A NECESITAR LAS CABECERAS EN EL GET (COMO POR EJEMPLO EL TOKEN)
			let headers = new headers('Content-Type':'application/json');
			let options = new RequestOptions({headers:headers});
		*/
		console.log(this.url);
		return this._http.get(this.url + 'viajes'/*,options*/).map(res => res.json());
	}//getVIAJEs
	
	getViajesUsuario(id){
	
		return this._http.get(this.url + '/viajes-usuario/'+id/*,options*/).map(res => res.json());
	}//getVIAJEs
	

	getViaje(id){
		/*
		ESTO ES POR SI SE LLEGA A NECESITAR LAS CABECERAS EN EL GET (COMO POR EJEMPLO EL TOKEN)
			let headers = new headers('Content-Type':'application/json');
			let options = new RequestOptions({headers:headers});
		*/
		return this._http.get(this.url + 'viaje/'+ id/*,options*/).map(res => res.json());
	}//getVIAJEs
	
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

	
	updateViaje(prod_update,token){
		let params = JSON.stringify(prod_update);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
			});
		return this._http.put(this.url+'upd-viaje/'+prod_update._id,params,{headers:headers})
			.map(res => res.json());
	}//updateVIAJE
	
	
	//METODO PARA ELIMINAR UN VIAJE
	deleteViaje(id){
		let headers = new Headers({
				'Content-Type':'application/json'
			});
		let options = new RequestOptions({headers:headers});
		return this._http.delete(this.url + 'del-viaje/' + id,options)
			.map(res => res.json());
	}//deleteVIAJE
	
}//VIAJEService