import { Component, OnInit, ViewChild } from '@angular/core';
import { Viaje } from '../../models/viaje';
import { Direccion } from '../../models/direccion';
import { ViajeService } from '../../services/viaje.service';
import { UsuarioService } from '../../services/usuario.service';
import * as moment from "moment";



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
  public viajeNuevo:Viaje;
  public viajes:Viaje[];
  //VARIABLES DE STATUS
	public status:string;
	

  constructor(private _viajeService:ViajeService,private _userService:UsuarioService) { 
	
    this.token = this._userService.getToken();
    this.viajes= [];
    
		
	}
	
  ngOnInit() {
    this.viajeNuevo = new Viaje('','',true,'','','');
     this.getViajes();
     this.direccionOrigen=new Direccion('','',0,'');
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

		moment.locale('es');
    moment().format('LLLL');
    
		this.viajeNuevo.horaSalida=moment().format('DD MMMM YYYY h:mm:ss a');
    
    this._viajeService.createDireccion(this.token,this.direccionOrigen).subscribe(
      response => {
        if(response.direccion && response.direccion._id){
          this.status = 'success';
          
          this.viajeNuevo.direccionO=response.direccion._id;

          this._viajeService.createViaje(this.token,this.viajeNuevo).subscribe(
            response => {
              if(response.viaje && response.viaje._id){
                this.status = 'success';
                this.viajeNuevo = new Viaje('','',true,'','',''); //REINCIAR EL VIAJEUNA VEZ QUE SE REGISTRE
                this.direccionOrigen = new Direccion('','',123,''); //REINCIAR la direccion una VEZ QUE SE REGISTRE
               // Form.reset();//ESTO ES PARA REINICAR EL FORMULARIO Y NO SALGAN LOS AVISOS DE LAS VALIDACIONES DEL CAMPO
                
            
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