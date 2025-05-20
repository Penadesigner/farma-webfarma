import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SearchService } from '../_shared/services/search.service';

@Injectable()
export class ProductIndexResolver implements Resolve<any> {

  constructor(
    private searchService: SearchService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let len = 15;
    let page = parseInt(route.paramMap.get('page'));
    let type = route.url[0].path.replace('-de-A-a-Z','');
    return this.searchService.getProductByName(route.paramMap.get('letter'), type, len, len * (page - 1));
  }
}