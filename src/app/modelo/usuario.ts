import { Logro } from "./logro";
import { Rol } from "./rol";

export class Usuario{
    id:number;
    nombre:string;
    nombreUsuario:string;
    email:string;
    password:string
    roles:Rol[];
    
    constructor(id:number,nombre:string,nombreUsuario:string,email:string,password:string,roles:Rol[]){
        this.id=id;
        this.nombre=nombre;
        this.nombreUsuario=nombreUsuario;
        this.password=password;
        this.roles=roles;

    }

}