import { proyectoInmobiliarioInterface } from "src/app/interfaces/proyecto-inmobiliario/proyecto-inmobiliarioInterface";

export class ProyectoInmobiliario implements proyectoInmobiliarioInterface {
    idproyecto_inmobiliario: number = 0;
    valor_total_proyecto: number = 0;
    rentabilidad_estimada: number = 0;
    valor_min_inicio_proy: number = 0;
    sum_valores_aportados: number = 0;
    valor_min_aportacion: number = 0;
    proyecto_activo: number = 0;
    //doc_plusvalia: Blob = new Blob();
    doc_plusvalia: string = "";
    nombre: string = "";

    constructor(idproyecto_inmobiliario: number,
        valor_total_proyecto: number,
        rentabilidad_estimada: number,
        valor_min_inicio_proy: number,
        sum_valores_aportados: number,
        valor_min_aportacion: number,
        proyecto_activo: number,
        //doc_plusvalia: Blob
        doc_plusvalia: string,
        nombre:string) {
        this.idproyecto_inmobiliario = idproyecto_inmobiliario;
        this. valor_total_proyecto =  valor_total_proyecto;
        this.rentabilidad_estimada = rentabilidad_estimada;
        this.valor_min_inicio_proy = valor_min_inicio_proy;
        this.sum_valores_aportados = sum_valores_aportados;
        this.valor_min_aportacion = valor_min_aportacion;
        this.proyecto_activo = proyecto_activo;
        this.doc_plusvalia = doc_plusvalia;
        this.nombre = nombre;
    }




}