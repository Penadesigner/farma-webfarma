import { Pipe, PipeTransform } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.replace(/[^0-9]/g,'').replace(/^0/,'').replace(/^(\d{2})(\d{4})(\d+)$/,'($1) $2-$3')
  }

}
