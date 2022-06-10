export enum EnumEstadoInversion {
  PendVldc = 'Pendiente de validación',
  Invcan = 'Inversión cancelada',
  EspInvInc = 'Esperando alcanzar objetivo inicial',
  InvComp = 'Inversión completa',
  PartVent = 'Participación en venta',
  NoEstado = 'Sin estado',
}

export class EnumEstadoInversionFunc{

    public getEstadoInversion(tipo:String){
        switch(tipo.toLocaleLowerCase()){
            case 'pendiente de validación':{
                return EnumEstadoInversion.PendVldc
            }
            case 'inversión cancelada':{
                return EnumEstadoInversion.Invcan
            }
            case 'esperando alcanzar objetivo inicial':{
                return EnumEstadoInversion.EspInvInc
            }
            case 'inversión completa':{
                return EnumEstadoInversion.InvComp
            }
            case 'participación en venta':{
                return EnumEstadoInversion.PartVent
            }
            case 'sin estado':{
                return EnumEstadoInversion.NoEstado
            }
            default:{
                return EnumEstadoInversion.NoEstado
            }
        }
    }

    public getEstadoInversionReverse(tipo:EnumEstadoInversion){
        switch(tipo){
            case EnumEstadoInversion.PendVldc:{
                return 'Pendiente de validación'
            }
            case EnumEstadoInversion.Invcan:{
                return 'Inversión cancelada'
            }
            case EnumEstadoInversion.EspInvInc:{
                return 'Esperando alcanzar objetivo inicial'
            }
            case EnumEstadoInversion.InvComp:{
                return 'Inversión completa'
            }
            case EnumEstadoInversion.PartVent:{
                return 'Participación en venta'
            }
            case EnumEstadoInversion.NoEstado:{
                return 'NoTipo'
            }
            default:{
                return 'NoTipo'
            }
        }
    }
}