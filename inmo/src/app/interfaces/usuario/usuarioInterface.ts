export interface UsuarioInterface {
    idusuario: number;
    num_ident: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;
    password: string;
    fecha_registro: Date;
    rol: string;
    nacionalidad: string;
    cp: number;
    comunidad_aut: string;
    provincia: string;
    poblacion: string;
    direccion: string;
    cuenta_suspendida: number;
    //dni_pasaporte_foto: Blob;
    dni_pasaporte_foto: string;
    fecha_verificacion: Date;
    verificado: number;
}