import { Component } from '@angular/core';
import { Router} from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss'],
	providers:[UsuarioService]
})
export class MisDatosPage  {

	
  constructor(private _userService:UsuarioService,private _router:Router) { 

		
//		setInterval(() => {
//			this.ngOnInit();
//      this.n = this.n + 1;
//    }, 500);

	}
	
	pageUpdate(){
		
		this._router.navigate(['/udatos']);
	}

}
