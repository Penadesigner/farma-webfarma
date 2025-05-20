import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { SearchService } from '../_shared/services/search.service';
import { UserAddressService } from '../_shared/services/user-address.service';
import { Address } from '../_shared/models/address.model';

@Injectable()
export class StoreDetailsResolver implements Resolve<any> {

  constructor(
    private searchService: SearchService,
    private userAddressService: UserAddressService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let cnpj = parseInt(route.paramMap.get('cnpj'));

    let address = new Address();
    address.state = route.paramMap.get('state');
    address.locality = route.paramMap.get('locality') ? route.paramMap.get('locality').replace(/-/g, ' ') : null;
    address.neighbourhood = route.paramMap.get('neighbourhood') ? route.paramMap.get('neighbourhood').replace(/-/g, ' ') : null;

    if (route.queryParamMap.get('lat') && route.queryParamMap.get('lng')) {
      let userAddress = new Address();
      userAddress.geo = {
        lat: parseFloat(route.queryParamMap.get('lat')),
        lng: parseFloat(route.queryParamMap.get('lng'))
      }
      return this.searchService.getStoreByCNPJ(cnpj, userAddress).pipe(
        map(data => data)
      )
    }
    return this.userAddressService.getRegionGeocode(address).pipe(
      mergeMap((geoAddress: Address) => {
        return this.searchService.getStoreByCNPJ(cnpj, geoAddress).pipe(
          map(data => data)
        )
      }));
  }
} 
