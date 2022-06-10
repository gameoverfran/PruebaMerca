import { InversionInterface } from "src/app/interfaces/inversion/inversionInterface";

export class Inversion implements InversionInterface {
    idinversion: number = 0;
    usuario_idusuario: number = 0;
    proyecto_inmobiliario_idproyecto_inmobiliario: number = 0;
    cantidad: number = 0;
    fecha_inversion: Date = new Date();
    estado_inversion: string = "";
    contrato_participacion_cliente: string  = "";
    contrato_participacion_ambos: string = "";
    recibo_firmado: string = "";
    fecha_recibo: Date = new Date();

    constructor( idinversion: number,
        usuario_idusuario: number,
        proyecto_inmobiliario_idproyecto_inmobiliario: number,
        cantidad: number,
        fecha_inversion: Date,
        estado_inversion: string,
        contrato_participacion_cliente: string,
        contrato_participacion_ambos: string,
        recibo_firmado: string,
        fecha_recibo: Date){
            this.idinversion = idinversion;
            this.usuario_idusuario = usuario_idusuario;
            this.proyecto_inmobiliario_idproyecto_inmobiliario = proyecto_inmobiliario_idproyecto_inmobiliario;
            this.cantidad = cantidad;
            this.fecha_inversion = fecha_inversion;
            this.estado_inversion = estado_inversion;
            this.contrato_participacion_cliente = contrato_participacion_cliente;
            this.contrato_participacion_ambos = contrato_participacion_ambos;
            this.recibo_firmado = recibo_firmado;
            this.fecha_recibo = fecha_recibo;
    }

}