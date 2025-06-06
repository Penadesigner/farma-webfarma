import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertiserService {
  apiUrl = environment.apiUrl + '/advertiser';
  PARAMS = new HttpParams({
    fromObject: {
      format: 'json'
    }
  });

  constructor(private http: HttpClient) { }

  getAdvertiserByUri(uriName: string): Observable<any> {
    if (!uriName) {
      return of([])
    }
    return this.http
      .get(`${this.apiUrl}/site/${uriName}`)
      .pipe(
        map((data: any) => data.response)
      );
  }

  getAdvertiserWithDistanceByUri(uriName: string, lat: number, lng: number): Observable<any> {
    if (!uriName) {
      return of([])
    }
    let params = this.PARAMS
      .set('uriName', uriName)
      .set('lat', lat.toString())
      .set('lng', lng.toString());
    return this.http
      .get(`${this.apiUrl}/farmaciaai/advertiserByUri`, {
        params: params
      })
      .pipe(
        map((data: any) => data.response)
      );
  }
}
