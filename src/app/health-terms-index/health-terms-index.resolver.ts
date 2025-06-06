import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SearchService } from '../_shared/services/search.service';

@Injectable()
export class HealthTermsIndexResolver implements Resolve<any> {

  constructor(
    private searchService: SearchService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let len = 15;
    let page = parseInt(route.paramMap.get('page'));
    return this.searchService.getHealthTermsByLetter(route.paramMap.get('letter'), len, len * (page - 1));
  }
}