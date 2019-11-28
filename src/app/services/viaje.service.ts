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

console.log(token);
		
		return this._http.post(this.url+'add-viaje',params,{headers:headers}).map(res => res.json());
		
		
	}//createViaje
	
	

	//MÉTODO PARA MANDAR A LLAMAR LAS NOTICIAS EN EL PANEL DE ADMINISTRACIÓN DE MANERA PAGINADA
	getViajesPages(page = null,token):Observable<any>{
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
			});
		return this._http.get(this.url + 'admin-viajes/' + page, {headers:headers}).map(res => res.json());
	}//getNoticiaPage

	//MÉTODO QUE MUESTRA LAS VIAJES DEL MES DE MANERA PAGINADA
	getViajes(page = null){
		let headers = new Headers({
			'Content-Type':'application/json'
			});
		return this._http.get(this.url + 'viajes/' + page, {headers:headers}).map(res => res.json());
	}//signup
	
	
	//MÉTODO QUE MUESTRA todas LAS VIAJES
	getViajesGeneral(){
		
		let headers = new Headers({
			'Content-Type':'application/json'
			});
		return this._http.get(this.url + 'seccion-viajes/', {headers:headers}).map(res => res.json());
	}//

	//METODO PARA MANDAR A LLAMAR LA INFORMACIÓN ESPECIFICA DE UNA NOTICIA
	getViaje(id){
		/*
		ESTO ES POR SI SE LLEGA A NECESITAR LAS CABECERAS EN EL GET (COMO POR EJEMPLO EL TOKEN)
			let headers = new headers('Content-Type':'application/json');
			let options = new RequestOptions({headers:headers});
		*/
		return this._http.get(this.url + 'viaje/'+ id/*,options*/).map(res => res.json());
	}//getAnimals
	
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

	
	
	//ACTUALIZAR VIAJE
	updateViaje(viaje_update){
		let params = JSON.stringify(viaje_update);
		let headers = new Headers({'Content-Type':'application/json', 'Authorization':this.getToken()});
		return this._http.put(this.url+'upd-viaje/'+viaje_update._id,params,{headers:headers})
			.map(res => res.json());
	}//updateUser

	//METODO PARA ELIMINAR UNA VIAJE
	deleteViaje(token,id){
		let headers = new Headers({
				'Content-Type':'application/json',
				'Authorization':token
			});
		let options = new RequestOptions({headers:headers});
		return this._http.delete(this.url + 'viaje/' + id,options)
			.map(res => res.json());
	}//deleteViaje

}//class