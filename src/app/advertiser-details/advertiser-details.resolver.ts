import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { SearchService } from '../_shared/services/search.service';
import { UserAddressService } from '../_shared/services/user-address.service';
import { Address } from '../_shared/models/address.model';
import { AdvertiserService } from '../_shared/services/advertiser.service';

@Injectable()
export class AdvertiserDetailsResolver implements Resolve<any> {

  constructor(
    private advertiserService: AdvertiserService,
    private searchService: SearchService,
    private userAddressService: UserAddressService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let nameUri = route.paramMap.get('nameUri');
    //CROP

    return this.advertiserService.getAdvertiserByUri(
      nameUri).pipe(
        mergeMap((adv) => {
          return this.searchService.getAdvertiserRankingByCoords(adv.advertiserDto.address, 10, 10).pipe(
            map((rank) => {
              return {
                advertiser: adv,
                storesRanking:
                  rank.map((rankAdv) => {
                    return { ...rankAdv.advertiserDto, ...{ nameUri: rankAdv.nameUri } }
                  })
              }
            })
          )
        })
      )
  }
}

//---CROP
// let address = new Address();
// address.state = route.paramMap.get('state');
// address.locality = route.paramMap.get('locality') ? route.paramMap.get('locality').replace(/-/g, ' ') : null;
// address.neighbourhood = route.paramMap.get('neighbourhood') ? route.paramMap.get('neighbourhood').replace(/-/g, ' ') : null;

// let userAddress;
// if (route.queryParamMap.get('lat') && route.queryParamMap.get('lng')) {
//   userAddress = new Address();
//   userAddress.geo = {
//     lat: parseFloat(route.queryParamMap.get('lat')),
//     lng: parseFloat(route.queryParamMap.get('lng'))
//   }
//   return this.advertiserService.getAdvertiserWithDistanceByUri(
//     nameUri,
//     parseFloat(route.queryParamMap.get('lat')),
//     parseFloat(route.queryParamMap.get('lng'))).pipe(
//       map(data => data)
//     )
// }
// return this.userAddressService.getRegionGeocode(address).pipe(
//   mergeMap((geoAddress: Address) => {
//     return this.advertiserService.getAdvertiserWithDistanceByUri(
//       nameUri, geoAddress.geo.lat, geoAddress.geo.lng).pipe(
//         map(data => data)
//       )
//   }));
//   }