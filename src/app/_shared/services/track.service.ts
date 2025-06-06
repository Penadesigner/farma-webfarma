import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, tap, map } from 'rxjs/operators';
import { UserSessionService } from './user-session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private trackApiUrl = environment.rootUrl + '/track';

  constructor(
    private http: HttpClient,
    private userSessionService: UserSessionService) { }

  track(trackData: any): Observable<any> {
    return this.userSessionService.getOneSignalID().pipe(
      concatMap((oneSignalID: string) => {
        if (oneSignalID && oneSignalID.length > 0) {
          trackData.playerId = oneSignalID;
          return this.http
            .post(this.trackApiUrl, trackData, { responseType: 'text' })
        }
        return of()
      })
    )
  }

}
