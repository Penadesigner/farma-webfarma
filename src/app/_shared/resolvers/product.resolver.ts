import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SearchService } from '../services/search.service';

@Injectable()
export class ProductResolver implements Resolve<any> {

  constructor(
    private searchService: SearchService) { }

  resolve(route: ActivatedRouteSnapshot) {
    if (route.paramMap.get('ean'))
      return this.searchService.getProductByEan(route.paramMap.get('ean'));
    return this.searchService.getProductByRegister(route.paramMap.get('register').substring(0, 9));
  }
}