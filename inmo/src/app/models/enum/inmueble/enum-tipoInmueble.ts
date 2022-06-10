export enum EnumTipoInmueble {
    NoTipo = 'noTipo',
    Edificacion = 'edificacion',
    Terreno = 'terreno',
}

export enum EnumTipoEdificacion{
    Local = 'local',
    Nave = 'nave',
    Instalacion = 'instalacion',
    Vivienda = 'vivienda',
    Trastero = 'trastero',
    Garaje = 'garaje',
    NoTipo = 'noTipo'
}

export enum EnumTipoTerreno{
    Terreno = 'terreno',
    NoTipo = 'notipo'
}


export class EnumTipoInmuebleFunc{

    getTipoInmueble(tipo:String){
        switch(tipo){
            case 'Edificacion':{
                return EnumTipoInmueble.Edificacion
            }
            case 'edificacion':{
                return EnumTipoInmueble.Edificacion
            }
            case 'Terreno':{
                return EnumTipoInmueble.Terreno
            }
            case 'terreno':{
                return EnumTipoInmueble.Terreno
            }
            default:{
                return EnumTipoInmueble.NoTipo
            }
        }
    }
    getTipoInmuebleReverse(tipo:EnumTipoInmueble){
        switch(tipo){
            case EnumTipoInmueble.Edificacion:{
                return 'Edificacion'
            }
            case EnumTipoInmueble.Terreno:{
                return 'Terreno'
            }
            default:{
                return 'NoTipo'
            }
        }
    }

    getTipoEdificacion(tipo:String){
        switch(tipo){
            case 'Local':{
                return EnumTipoEdificacion.Local
            }
            case 'local':{
                return EnumTipoEdificacion.Local
            }
            case 'Nave':{
                return EnumTipoEdificacion.Nave
            }
            case 'nave':{
                return EnumTipoEdificacion.Nave
            }
            case 'Instalacion':{
                return EnumTipoEdificacion.Instalacion
            }
            case 'instalacion':{
                return EnumTipoEdificacion.Instalacion
            }
            case 'Vivienda':{
                return EnumTipoEdificacion.Vivienda
            }
            case 'vivienda':{
                return EnumTipoEdificacion.Vivienda
            }
            case 'Trastero':{
                return EnumTipoEdificacion.Trastero
            }
            case 'trastero':{
                return EnumTipoEdificacion.Trastero
            }
            case 'Garaje':{
                return EnumTipoEdificacion.Garaje
            }
            case 'garaje':{
                return EnumTipoEdificacion.Garaje
            }
            default:{
                return EnumTipoEdificacion.NoTipo
            }
        }
    }

    getTipoEdificacionReverse(tipo:EnumTipoEdificacion){
        switch(tipo){
            case EnumTipoEdificacion.Local:{
                return 'Local'
            }
            case EnumTipoEdificacion.Nave:{
                return 'Nave'
            }
            case EnumTipoEdificacion.Instalacion:{
                return 'Instalacion'
            }
            case EnumTipoEdificacion.Vivienda:{
                return 'Vivienda'
            }
            case EnumTipoEdificacion.Trastero:{
                return 'Trastero'
            }
            case EnumTipoEdificacion.Garaje:{
                return 'Garaje'
            }
            default:{
                return 'NoTipo'
            }
        }
    }

    getTipoTerreno(tipo:string){
        switch(tipo){
            case 'Terreno':{
                return EnumTipoTerreno.Terreno
            }
            case 'terreno':{
                return EnumTipoTerreno.Terreno
            }
            default:{
                return EnumTipoTerreno.NoTipo
            }
        }
    }

    getTipoTerrenoReverse(tipo:EnumTipoTerreno){
        switch(tipo){
            case EnumTipoTerreno.Terreno:{
                return 'Terreno'
            }
            default:{
                return 'NoTipo'
            }
        }
    }

}