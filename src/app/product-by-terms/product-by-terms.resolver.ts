import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SearchService } from '../_shared/services/search.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { zip } from 'rxjs';

@Injectable()
export class ProductByTermsResolver implements Resolve<any> {

  constructor(
    private searchService: SearchService,
    private sanitizer: DomSanitizer) { }

  resolve(route: ActivatedRouteSnapshot) {
    return zip(
      this.searchService.getHealthTermByUri(route.paramMap.get('terms')).pipe(
        map((response: any) => {
          response.descricao = this.sanitizer.bypassSecurityTrustHtml(response.descricao);
          return response;
        })
      ) 
      ,
      this.searchService.getProductByTerms(route.paramMap.get('terms').replace(/-/g, ' ')).pipe(
        map((response: any) => {
          response.result.forEach((product => {
            product.descricao = this.sanitizer.bypassSecurityTrustHtml(product.descricao);
          }))
          return response;
        })
      )).pipe(map(data => {
        return {
          products: data[1],
          term: data[0]
        }
      }))
  }
}