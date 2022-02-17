import { Pipe, PipeTransform } from '@angular/core';
import { Arret } from './arret';

@Pipe({
  name: 'arretFiltre'
})
export class ArretFiltrePipe implements PipeTransform {

  transform(items: Arret[], filter: string): any {
   if (!items || !filter){
     return items;
   } 
   return items.filter(item => item.stopName.toUpperCase().indexOf(filter.toUpperCase()) !== -1 );

  }

}
