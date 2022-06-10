import { UsuarioInterface } from "src/app/interfaces/usuario/usuarioInterface";

export class Usuario implements UsuarioInterface {
    idusuario: number = 0;
    num_ident: string = "";
    nombre: string = "";
    apellido: string = "";
    email: string = "";
    telefono: number = 0;
    password: string = "";
    fecha_registro: Date = new Date();
    rol: string = "";
    nacionalidad: string = "";
    comunidad_aut: string = "";
    provincia: string = "";
    poblacion: string = "";
    cp: number = 0;
    direccion: string = "";
    cuenta_suspendida: number = 0;
    //dni_pasaporte_foto: Blob = new Blob();
    dni_pasaporte_foto: string = "";
    fecha_verificacion: Date = new Date();
    verificado: number = 0;


    constructor( 
    idusuario: number,
    num_ident: string,
    nombre: string,
    apellido: string,
    email: string,
    telefono: number,
    password: string,
    fecha_registro: Date,
    rol: string,
    nacionalidad: string,
    comunidad_aut: string,
    provincia: string,
    poblacion: string,
    cp: number,
    direccion: string,
    cuenta_suspendida: number,
    fecha_verificacion: Date,
    verificado: number,
    dni_pasaporte_foto?: Blob,
    ){
        this.idusuario = idusuario;
        this.num_ident = num_ident;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
        this.fecha_registro = fecha_registro;
        this.rol = rol;
        this.nacionalidad = nacionalidad;
        this.comunidad_aut = comunidad_aut;
        this.provincia = provincia;
        this.poblacion = poblacion;
        this.cp = cp;
        this.direccion = direccion;
        this.cuenta_suspendida = cuenta_suspendida;
        this.fecha_verificacion = fecha_registro;
        this.verificado = verificado;
        this.dni_pasaporte_foto = "";
        this.fecha_verificacion = fecha_verificacion;
        
    }   

}