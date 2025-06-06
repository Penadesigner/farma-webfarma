import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {
  cepSearchUrl = environment.apiUrl + '/search/address/br/';
  advSearchUrl = environment.apiUrl + '/search/farmaciaai/advertisers';
  geoSearchUrl = environment.apiUrl + '/search/farmaciaai/geocode';
  googleGeocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  PARAMS = new HttpParams({
    fromObject: {
      format: 'json'
    }
  });
  // geocoder: any;//GoogleMapsClient;
  private addressSource: ReplaySubject<Address>;
  currentAddress: Observable<Address>;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage: StorageService
  ) {
    // this.geocoder = new google.maps.Geocoder();
    this.addressSource = new ReplaySubject(1);
    this.addressSource.next(this.retrieveCurrentAddress());
    this.currentAddress = this.addressSource.asObservable();
  }

  getNearAdvertisers(address: Address, limit: string = '1') {
    return this.http.get(this.advSearchUrl, {
      params: this.PARAMS
        .set('lat', address.geo.lat.toString())
        .set('lng', address.geo.lng.toString())
        .set('limit', limit)
    })
      .pipe(
        map((data: any) => data.response),
        catchError(this.handleError<Address>('getNearAdvertisers'))
      );
  }

  getAddressByCep(cep: string): Observable<Address> {

    return this.getAddressDetails(cep).pipe(
      mergeMap((address: Address) => {
        return this.getAddressGeocode(address).pipe(
          map((geoAddress: Address) => {
            return geoAddress;
          }))
      })
    );
  }

  getRegionGeocode(region: Address): Observable<Address> {
    return this.http.get<Address>(this.geoSearchUrl, {
      params: this.PARAMS
        .set('neighbourhood', (region.neighbourhood || ''))
        .set('locality', (region.locality || ''))
        .set('state', (region.state || ''))
    })
      .pipe(
        map((data: any) => {
          return data.response as Address
        }),
        catchError(this.handleError<Address>('getRegionGeocode'))
      );
  }


  private getAddressGeocode(address: Address): Observable<Address> {
    return this.http.get<Address>(this.googleGeocodeUrl, {
      params: this.PARAMS
        .set('key', environment.GOOGLE_MAPS_OPTIONS.key)
        .set('address', [address.street, address.neighbourhood, address.locality, address.state].join(', '))
        .set('region', 'BR')
    })
      .pipe(
        map((data: any) => {
          let geo = data.results[0].geometry.location;
          address.geo = geo;
          return address as Address
        }),
        catchError(this.handleError<Address>('getAddressGeocode'))
      );
  }

  private getAddressDetails(cep: string): Observable<Address> {
    return this.http.get<Address>(this.cepSearchUrl + cep)
      .pipe(
        map((data: any) => {
          return data.response as Address
        }),
        catchError(this.handleError<Address>('getAddressDetails'))
      );
  }

  updateCurrentAddress(address: Address): Address {
    this.localStorage.set('current-address', address);
    this.addressSource.next(address);
    return address;
  }

  private retrieveCurrentAddress(): Address {
    return this.localStorage.get('current-address');
  }

  getStatesList(): Array<[string, string]> {
    return [["no Acre", "AC"], ["em Alagoas", "AL"], ["no Amapá", "AP"],
    ["no Amazonas", "AM"], ["na Bahia", "BA"], ["no Ceará", "CE"], ["no Distrito Federal", "DF"], ["no Espírito Santo", "ES"],
    ["em Goiás", "GO"], ["no Maranhão", "MA"], ["em Mato Grosso", "MT"], ["em Mato Grosso do Sul", "MS"], ["em Minas Gerais", "MG"], ["no Pará", "PA"],
    ["na Paraíba", "PB"], ["no Paraná", "PR"], ["em Pernambuco", "PE"], ["no Piauí", "PI"], ["no Rio de Janeiro", "RJ"],
    ["no Rio Grande do Norte", "RN"], ["no Rio Grande do Sul", "RS"], ["em Rondônia", "RO"], ["em Roraima", "RR"], ["em Santa Catarina", "SC"],
    ["em São Paulo", "SP"], ["em Sergipe", "SE"], ["no Tocantins", "TO"]];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
