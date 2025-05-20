import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { UserAddressService } from '../services/user-address.service';
import { Address } from '../models/address.model';

@Injectable()
export class StoreDetailsRankingResolver implements Resolve<any> {

  constructor(
    private searchService: SearchService,
    private userAddressService: UserAddressService) { }

  resolve(route: ActivatedRouteSnapshot) {
    
    let address = new Address();
    address.state = route.paramMap.get('state');
    address.locality = route.paramMap.get('locality') ? route.paramMap.get('locality').replace(/-/g, ' ') : null;
    address.neighbourhood = route.paramMap.get('neighbourhood') ? route.paramMap.get('neighbourhood').replace(/-/g, ' ') : null;

    return this.userAddressService.getRegionGeocode(address).pipe(
      mergeMap((geoAddress: Address) => {
        return this.searchService.getAdvertiserRankingByCoords(geoAddress, 10, 10).pipe(
          map((advs) => {
            return advs.map((adv) => {
              return {...adv.advertiserDto, ...{nameUri: adv.nameUri}}
            })
          }))
      }))
  }
}

