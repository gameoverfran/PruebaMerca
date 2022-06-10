export interface proyectoInmobiliarioInterface {
    idproyecto_inmobiliario:number;
    valor_total_proyecto: number;
    rentabilidad_estimada:number;
    valor_min_inicio_proy:number;
    sum_valores_aportados:number;
    valor_min_aportacion:number;
    proyecto_activo:number;
    //doc_plusvalia: Blob;
    doc_plusvalia: string;
    nombre: string;
}