import { Component, OnInit, ViewChild } from '@angular/core';
import { Viaje } from '../../models/viaje';
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
	public viajeNuevo:Viaje;
  //VARIABLES DE STATUS
	public status:string;
	

  constructor(private _viajeService:ViajeService,private _userService:UsuarioService) { 
	
		 this.viajeNuevo = new Viaje('','','','',true);
    this.token = this._userService.getToken();
		
	}
	
  ngOnInit() {
		 this.viajeNuevo = new Viaje('','','','',true);
  }
	
	
  //MÉTODO PARA CREAR EL VIAJE
  onSubmit(Form){

		moment.locale('es');
		moment().format('LLLL');
		this.viajeNuevo.horaSalida=moment().format('DD MMMM YYYY h:mm:ss a');
		
	
		
		
    this._viajeService.createViaje(this.token,this.viajeNuevo).subscribe(
        response => {
          if(response.viaje && response.viaje._id){
            this.status = 'success';
            this.viajeNuevo = new Viaje('','','','',true); //REINCIAR EL VIAJEUNA VEZ QUE SE REGISTRE
           // Form.reset();//ESTO ES PARA REINICAR EL FORMULARIO Y NO SALGAN LOS AVISOS DE LAS VALIDACIONES DEL CAMPO
						
        
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