export class User{
	
	constructor(
		public _id:string,
		public name:string, 
		 public municipio:string,
		 public localidad:string,
		 public sector:string,
		 public role:string, 
		public surname:string,
		public email:string, 
		public password:string,
		 public status:boolean,
		
		public image:string
		){

	}//Constructor

}//User