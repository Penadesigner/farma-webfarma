import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { of, Observable, from } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { } from 'googlemaps';
import { Stats } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchUrl = environment.apiUrl + '/search/farmaciaai';
  googlePlacesUrl = 'https://maps.googleapis.com/maps/api/place'
  PARAMS = new HttpParams({
    fromObject: {
      format: 'json'
    }
  });

  constructor(private http: HttpClient) { }

  getOffersByEan(ean: string, address: Address): Observable<any> {
    if (!ean || !address) {
      return of([])
    }
    return this.http
      .get(`${this.searchUrl}/offersByEan`, {
        params: this.PARAMS
          .set('ean', ean)
          .set('lat', address.geo.lat.toString())
          .set('lng', address.geo.lng.toString())
          .set('sortby', 'lowerPrice')
        // .set('limit', '5')
      }).pipe(
        map((data: any) => data.response)
      );
  }

  getPriceRequestStores(ean: string, address: Address): Observable<any> {
    if (!ean || !address) {
      return of([])
    }
    return this.http
      .get(`${this.searchUrl}/priceRequestStores`, {
        params: this.PARAMS
          .set('ean', ean)
          .set('lat', address.geo.lat.toString())
          .set('lng', address.geo.lng.toString())
      }).pipe(
        map((data: any) => data.response)
      );
  }

  getProductByRegister(register: string): Observable<any> {
    if (!register) {
      return of([])
    }
    return this.http
      .get(`${this.searchUrl}/productsByRegister`, {
        params: this.PARAMS
          .set('register', register)
        // .set('limit', '5')
      }).pipe(
        map((data: any) => data.response)
      );
  }

  getProductByName(name: string, type: string = 'medicamentos', limit: number = 10, offset: number = 0): Observable<any> {
    if (!name) {
      return of([])
    }
    return this.http
      .get(`${this.searchUrl}/productsByName`, {
        params: this.PARAMS
          .set('firstLetter', name)
          .set('type', type)
          .set('limit', limit.toString())
          .set('offset', offset.toString())
      }).pipe(
        map((data: any) => data.response)
      );
  }
  getHealthTermByUri(uri: string) {
    if (!uri) {
      return of()
    }
    return this.http
      .get(`${this.searchUrl}/healthTermsByUri`, {
        params: this.PARAMS
          .set('uri', uri)
      }).pipe(
        map((data: any) => data.response)
      );
  }
  getHealthTermsByLetter(firstLetter: string, limit: number = 20, offset: number = 0): Observable<any> {
    if (!firstLetter) {
      return of([])
    }
    return this.http
      .get(`${this.searchUrl}/healthTermsByLetter`, {
        params: this.PARAMS
          .set('firstLetter', firstLetter)
          .set('limit', limit.toString())
          .set('offset', offset.toString())
      }).pipe(
        map((data: any) => data.response)
      );
  }

  getProductByTerms(terms: string, type: string = 'medicamentos', limit: number = 20, offset: number = 0): Observable<any> {
    if (!terms) {
      return of([])
    }
    return this.http
      .get(`${this.searchUrl}/productsByTerms`, {
        params: this.PARAMS
          .set('terms', terms)
          .set('type', type)
          .set('limit', limit.toString())
          .set('offset', offset.toString())
      }).pipe(
        map((data: any) => data.response)
      );
  }


  getProductByEan(ean: string): Observable<any> {
    if (!ean) {
      return of([])
    }
    return this.http
      .get(`${this.searchUrl}/productByEan`, {
        params: this.PARAMS
          .set('ean', ean)
        // .set('limit', '5')
      }).pipe(
        map((data: any) => data.response)
      );
  }

  autocomplete(keywords: string, address: Address, limit: number = 5): Observable<any> {
    if (keywords === '' || !address) {
      return of([]);
    }
    return this.http
      .get(`${this.searchUrl}/autocomplete`, {
        params: this.PARAMS
          .set('keywords', keywords)
          .set('lat', address.geo.lat.toString())
          .set('lng', address.geo.lng.toString())
          .set('limit', limit.toString())
      }).pipe(
        map((data: any) => data.response)
      );
  }

  getAdvertisersByRegion(lat, lng, userAddress: Address, radius = 10000, limit = 15, offset = 0): Observable<any> {
    return this.http
      .get(`${this.searchUrl}/advertisersByRegion`, {
        params: this.PARAMS
          .set('lat', lat.toString())
          .set('lng', lng.toString())
          .set('userLat', userAddress.geo.lat.toString())
          .set('userLng', userAddress.geo.lng.toString())
          .set('radius', radius.toString())
          .set('limit', limit.toString())
          .set('offset', offset.toString())
      })
      .pipe(
        map((data: any) => data.response)
      );
  }

  getStoresByRegion(address: Address, userAddress: Address, limit = 15, offset = 0): Observable<any> {
    let params = this.PARAMS
      .set('lat', userAddress.geo.lat.toString())
      .set('lng', userAddress.geo.lng.toString())
      .set('state', address.state)
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    if (address.neighbourhood)
      params = params.set('neighbourhood', address.neighbourhood)
    if (address.locality)
      params = params.set('locality', address.locality)

    return this.http
      .get(`${this.searchUrl}/storesByRegion`, {
        params: params
      })
      .pipe(
        map((data: any) => data.response)
      );
  }

  getStoresByCoords(address: Address, radius = 10, limit = 15, offset = 0): Observable<any> {
    let params = this.PARAMS
      .set('lat', address.geo.lat.toString())
      .set('lng', address.geo.lng.toString())
      .set('radius', radius.toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http
      .get(`${this.searchUrl}/storesByCoords`, {
        params: params
      })
      .pipe(
        map((data: any) => data.response)
      );
  }

  getSubregions(address: Address, limit = 60, offset = 0): Observable<any> {
    let params = this.PARAMS
      .set('state', address.state)
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    if (address.locality)
      params = params.set('locality', address.locality)

    return this.http
      .get(`${this.searchUrl}/subregions`, {
        params: params
      })
      .pipe(
        map((data: any) => data.response)
      );
  }

  getStoreByCNPJ(cnpj: number, address: Address) {
    let params = this.PARAMS
      .set('cnpj', cnpj.toString())
      .set('lat', address.geo.lat.toString())
      .set('lng', address.geo.lng.toString());
    return this.http
      .get(`${this.searchUrl}/storeByCNPJ`, {
        params: params
      })
      .pipe(
        map((data: any) => data.response)
      );
  }

  getAdvertiserRankingByCoords(address: Address, radius = 10, limit = 10, offset = 0) {
    let params = this.PARAMS
      .set('lat', address.geo.lat.toString())
      .set('lng', address.geo.lng.toString())
      .set('radius', radius.toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http
      .get(`${this.searchUrl}/advertiserRankingByCoords`, {
        params: params
      })
      .pipe(
        map((data: any) => data.response)
      );
  }
  getStorePlaceId(store: any): Observable<any> {
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    const promise = new Promise(function (resolve, reject) {
      service.findPlaceFromQuery({
        query: [store.name, store.address.street, store.address.neighbourhood, store.address.locality, store.address.state, 'BR'].join(', '),
        fields: ['place_id']
      }, (results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          resolve(results[0].place_id);
        }
        else {
          reject();
        }
      })
    })
    return from(promise);
  }
  // getStorePhoneNumber(store: any): Observable<any> {
  //   var service = new google.maps.places.PlacesService(document.createElement('div'));
  //   const promise = new Promise(function (resolve) {
  //     service.findPlaceFromQuery({
  //       query: [store.name, store.address.street, store.address.neighbourhood, store.address.locality, store.address.state, 'BR'].join(', '),
  //       fields: ['place_id']
  //     }, (results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
  //       if (status == google.maps.places.PlacesServiceStatus.OK) {
  //         service.getDetails({
  //           placeId: results[0].place_id,
  //           fields: ['formatted_phone_number'] //,'rating', 'opening_hours']
  //         }, (result: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) => {
  //           if (status == google.maps.places.PlacesServiceStatus.OK) {
  //             resolve(result);
  //           }
  //           else {
  //             resolve();
  //           }
  //         })
  //       }
  //       else {
  //         resolve();
  //       }
  //     })
  //   })
  //   return from(promise)
  // }

}
