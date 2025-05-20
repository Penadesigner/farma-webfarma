import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SearchService } from '../_shared/services/search.service';
import { UserAddressService } from '../_shared/services/user-address.service';
import { Address } from '../_shared/models/address.model';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of, observable, Observable } from 'rxjs';

@Injectable()
export class StoresByRegionResolver implements Resolve<any> {

  constructor(
    private searchService: SearchService,
    private userAddressService: UserAddressService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let address = new Address();
    let len = 6;
    let page = parseInt(route.paramMap.get('page'));


    address.state = route.paramMap.get('state');
    address.locality = route.paramMap.get('locality') ? route.paramMap.get('locality').replace(/-/g, ' ') : null;
    address.neighbourhood = route.paramMap.get('neighbourhood') ? route.paramMap.get('neighbourhood').replace(/-/g, ' ') : null;

    let userAddress: Address;
    if (route.queryParamMap.get('lat') && route.queryParamMap.get('lng')) {
      userAddress = new Address();
      userAddress.geo = {
        lat: parseFloat(route.queryParamMap.get('lat')),
        lng: parseFloat(route.queryParamMap.get('lng'))
      }
    }
    let radius;
    if (address.neighbourhood)
      radius = 10000
    else if (address.locality)
      radius = 50000
    else
      radius = 100000

    return this.userAddressService.getRegionGeocode(address).pipe(
      mergeMap((geoAddress: Address) => {
        return zip(
          // this.searchService.getAdvertisersByRegion(geoAddress.geo.lat, geoAddress.geo.lng, (userAddress || geoAddress), radius),
          this.searchService.getAdvertiserRankingByCoords(geoAddress, radius/1000, 10).pipe(
            map((advs) => {
              return advs.map((adv) => {
                return {...adv.advertiserDto, ...{nameUri: adv.nameUri}}
              })
            })),
          this.searchService.getStoresByRegion(geoAddress, (userAddress || geoAddress), len, len * (page - 1)),
          this.searchService.getSubregions(geoAddress),
          of(geoAddress))
      }),
      map(data => {
        return {
          // advertisers: data[0]
          rankingStores: data[0],
          stores: data[1],
          subregions: data[2],
          address: data[3]
        }
      }
      )
    )
  }
} 
