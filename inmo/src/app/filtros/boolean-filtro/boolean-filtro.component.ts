import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalBoolean'
})

export class BooleanFiltroComponent implements  PipeTransform {

  constructor() { }



  transform(value: any, args?: any): any {
    if (args=='cuenta_suspendida'){
      if(value <= 0){
        return 'Suspendida'
      }
      return 'Activa'
    }

    if(value <= 0){
      return 'No'
    }
    return 'Sí'
  }

}
