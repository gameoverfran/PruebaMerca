import { InmuebleInterface } from "src/app/interfaces/inmueble/inmuebleInterface";


export class Inmueble implements InmuebleInterface {
    idinmueble: number = 0;
    usuario_idusuario: number = 0;
    proyecto_inmobiliario_idproyecto_inmobiliario: number = 0;
    valor: number = 0;
    anejos: string = "";
    metros: number = 0;
    informacion_extra: string = "";
    situacion: string = "";
    comunidad_autonoma: string = "";
    provincia: string = "";
    poblacion: string = "";
    cp: number = 0;
    calle: string = "";
    numero_calle: string = "";
    fecha_construccion: Date = new Date();
    tipo: string = "";
    tipo_terreno: string = "";
    tipo_edificacion: string = "";
    aprovechamiento: string = "";
    conservacion: string = "";
    numero_edificio: string = "";
    gastos_comunidad: number = 0;
    acondicionamiento: string = "";
    tipo_instalacion: string = "";
    titularidad: string = "";
    amueblado: number = 0;
    habitaciones: number = 0;
    banos: number = 0;
    trastero: number = 0;
    garaje: number = 0;
    orientacion: string = "";
    terraza: number = 0;
    fotosList: Array<String> = [];
    nombre: string = "";


    constructor(
        idinmueble: number,
        usuario_idusuario: number,
        proyecto_inmobiliario_idproyecto_inmobiliario: number,
        valor: number,
        anejos: string,
        metros: number,
        informacion_extra: string,
        situacion: string,
        comunidad_autonoma: string,
        provincia: string,
        poblacion: string,
        cp: number,
        calle: string,
        numero_calle: string,
        fecha_construccion: Date,
        tipo: string,
        tipo_terreno: string,
        tipo_edificacion: string,
        aprovechamiento: string,
        conservacion: string,
        numero_edificio: string,
        gastos_comunidad: number,
        acondicionamiento: string,
        tipo_instalacion: string,
        titularidad: string,
        amueblado: number,
        habitaciones: number,
        banos: number,
        trastero: number,
        garaje: number,
        orientacion: string,
        terraza: number,
        fotosList?: Array<String>,
        nombre?: string) {

        this.idinmueble = idinmueble;
        this.usuario_idusuario = usuario_idusuario; 
        this.proyecto_inmobiliario_idproyecto_inmobiliario = proyecto_inmobiliario_idproyecto_inmobiliario;
        this.valor = valor;
        this.anejos = anejos;
        this.metros = metros;
        this.informacion_extra = informacion_extra;
        this.situacion = situacion;
        this.comunidad_autonoma = comunidad_autonoma;
        this.provincia = provincia;
        this.poblacion = poblacion;
        this.cp = cp;
        this.calle = calle;
        this.numero_calle = numero_calle;
        this.fecha_construccion = fecha_construccion;
        this.tipo = tipo;
        this.tipo_terreno = tipo_terreno;
        this.tipo_edificacion = tipo_edificacion;
        this.aprovechamiento = aprovechamiento;
        this.conservacion = conservacion;
        this.numero_edificio = numero_edificio;
        this.gastos_comunidad = gastos_comunidad;
        this.acondicionamiento = acondicionamiento;
        this.tipo_instalacion = tipo_instalacion;
        this.titularidad = titularidad;
        this.amueblado = amueblado;
        this.habitaciones = habitaciones;
        this.banos = banos;
        this.trastero = trastero;
        this.garaje = garaje;
        this.orientacion = orientacion;
        this.terraza = terraza;
        if(fotosList != null){
            this.fotosList = fotosList
        }
        if(nombre != null){
            this.nombre = nombre
        }
    }



}

