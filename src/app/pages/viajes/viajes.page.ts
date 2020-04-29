import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Viaje } from '../../models/viaje';
import { Direccion } from '../../models/direccion';
import { ViajeService } from '../../services/viaje.service';
import { UsuarioService } from '../../services/usuario.service';
import * as moment from "moment";
import { User } from '../../models/usuario';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, marker, tileLayer, polyline} from 'leaflet';

export interface Selector {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  providers:[
  	ViajeService,UsuarioService
  ]
})
export class ViajesPage implements OnInit {
	
  public token;
  public direccionOrigen:Direccion;
  public direccionDestino:Direccion;
  public viajeNuevo:Viaje;
  public viajes:Viaje[];
  //VARIABLES DE STATUS
  public status:string;
  public map:Map;
  public marker:any;
  public latLong=[];
  

  constructor(private _viajeService:ViajeService,private _userService:UsuarioService, private geolocation:Geolocation) { 
	
    this.token = this._userService.getToken();
    this.viajes= [];
    
		
	}
	
  ngOnInit() {
    // this.viajeNuevo = new Viaje('','',true,'','','');
     this.getViajes();
     this.direccionOrigen=new Direccion('','',0,'');
     this.direccionDestino=new Direccion('','',0,'');
  }
  
ionViewDidEnter(){
this.showMap();
this.getPositions();
}

  showMap() {
    this.map = new Map('map').setView([25.701866, -100.344934], 13);
    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
      maxZoom:18,
    }).addTo(this.map);

    this.map.on('moveend', function() {
      console.log("moviendose");
  });
}

/* map.on('move', function () {
  marker.setLatLng(map.getCenter());
  //console.log(map.getCenter());
});
//Dragend event of map for update marker position
map.on('dragend', function(e) {
  var cnt = map.getCenter();
        var position = marker.getLatLng();
  lat = Number(position['lat']).toFixed(5);
  lng = Number(position['lng']).toFixed(5);
  //console.log(position);
  setLeafLatLong(lat, lng);
  
}); */

showMarker(latLong) {
    this.marker = marker(latLong, 15);
    
    this.marker.addTo(this.map)
    .bindPopup('<p>Latitud:'+latLong[0]+'</p><p>Longitud:'+latLong[1]+'</p>');
    
    this.map.setView(latLong);
}



centrar(){
  var s=this.map.getCenter();
  this.marker.setLatLng(s);
  console.log("centrado");
}

getloc() {
  var a=this.marker.getLatLng();
  console.log(a);
}

getPositions() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((res) => {
      return this.latLong = [
        res.coords.latitude,
        res.coords.longitude
      ]
    }).then((latlng) => {
      if (this.marker) {
        this.marker.remove();
        this.showMarker(latlng);
      } else {
        this.showMarker(latlng);
      };
    });
}

  
  getViajes(){
    
    this._viajeService.getViajes().subscribe(
      response => {
        if(!response.viajes){
          console.log("error");
        }
        else
        {
        
         for (let viaje of response.viajes){
          this.viajes.push(viaje);


         }
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
  

  //MÉTODO PARA CREAR EL VIAJE
  onSubmit(Form){

		/* moment.locale('es');
    moment().format('LLLL');


    this.viajeNuevo.horaSalida=moment().format('DD MMMM YYYY h:mm:ss a'); */

    this.viajeNuevo.horaSalida=new Date();

    this._viajeService.createDireccion(this.token,this.direccionOrigen).subscribe(
      response => {
        if(response.direccion && response.direccion._id){
          this.status = 'success';
          this.viajeNuevo.direccionO=response.direccion._id;
          
          this._viajeService.createDireccion(this.token,this.direccionDestino).subscribe(
            response => {
              if(response.direccion && response.direccion._id){
                this.status = 'success';
                this.viajeNuevo.direccionD=response.direccion._id;

                this._viajeService.createViaje(this.token,this.viajeNuevo).subscribe(
                  response => {
                    if(response.viaje && response.viaje._id){
                      this.status = 'success';
                      // this.viajeNuevo = new Viaje('','',true,'','',''); //REINCIAR EL VIAJEUNA VEZ QUE SE REGISTRE
                      this.direccionOrigen = new Direccion('','',123,''); //REINCIAR la direccion una VEZ QUE SE REGISTRE
                      this.direccionDestino = new Direccion('','',123,''); //REINCIAR la direccion una VEZ QUE SE REGISTRE
                      
                      Form.reset();//ESTO ES PARA REINICAR EL FORMULARIO Y NO SALGAN LOS AVISOS DE LAS VALIDACIONES DEL CAMPO                      
                  
                    }else{
                      this.status = 'error';
                    }
                  },
                  error => {
                    console.log(<any>error);
                  }
                );
                
                
              }else{
                this.status = 'error';
              }
            },
            error => {
              console.log(<any>error);
            }
          );
          
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
	
		
    

		
  }//onSubmit
	
	
	
	
	

}

