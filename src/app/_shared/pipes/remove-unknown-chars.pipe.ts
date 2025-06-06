import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnknownChars'
})
export class RemoveUnknownCharsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == undefined)
      return value
    return value.normalize('NFD').replace(/[\uE000-\uF8FF]/g, '');
  }

}
