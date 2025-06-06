import { Pipe, PipeTransform } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Pipe({
  name: 'prepareUri'
})
export class PrepareUriPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let params: HttpParams;
    if (Array.isArray(value) && value.length > 1) {
      if (value[1]) {
        params = new HttpParams({
          fromObject: value[1]
        });
      }
      value = value[0]
    }
    let result = value
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (args && args.includes('keepSlashes'))
      result = result.replace(/[\s+\(\)]/g, '-')
    else {
      result = result.replace(/[\s+\(\)\/]/g, '-')
    }
    result = result
      .replace(/-+/g, '-')
      .replace(/-$/, '')
      .replace(/%/g,'')
      .replace(/\/{2,}/g,'/');

    if (params) {
      result = result + '?' + params.toString();
    }
    return result;
  }

}
