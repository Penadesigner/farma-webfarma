import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private sourceOneSignalID: ReplaySubject<string>;
  private sourceBottonBannerViewd: ReplaySubject<boolean>;


  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: StorageService,
    @Inject(SESSION_STORAGE) private sessionStorage: StorageService
  ) {
    this.sourceOneSignalID = new ReplaySubject<string>(1);
    this.sourceOneSignalID.next(this.localStorage.get('oneSignalID'));

    this.sourceBottonBannerViewd = new ReplaySubject<boolean>(1);
    this.sourceBottonBannerViewd.next(this.sessionStorage.get('bottonBannerViewd'));
  }

  getOneSignalID(): Observable<string> {
    return this.sourceOneSignalID.asObservable();
  }

  getBottonBannerViewd(): Observable<boolean> {
    return this.sourceBottonBannerViewd.asObservable();
  }

  isApp(): Observable<boolean> {
    return this.getOneSignalID().pipe(map(
      (oneSignalID) => {
        if (!oneSignalID || oneSignalID.length < 1) {
          return false;
        }
        return true;
      })
    )
  }

  setOneSignalID(oneSignalID: string): string {
    this.localStorage.set('oneSignalID', oneSignalID);
    this.sourceOneSignalID.next(oneSignalID);
    return oneSignalID;
  }

  setBottonBannerViewd(bottonBannerViewd: boolean): boolean {
    this.sessionStorage.set('bottonBannerViewd', bottonBannerViewd);
    this.sourceBottonBannerViewd.next(bottonBannerViewd);
    return bottonBannerViewd;
  }
}
