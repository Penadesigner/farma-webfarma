import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertiserService } from '../_shared/services/advertiser.service';
import { HttpParams } from '@angular/common/http';
import { UserSessionService } from '../_shared/services/user-session.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-store-redirect',
  templateUrl: './store-redirect.component.html',
  styleUrls: ['./store-redirect.component.css']
})
export class StoreRedirectComponent implements OnInit, AfterViewInit {

  advertiser: any;
  urlRedirect: string = "";
  isApp: boolean;
  stopRedirect: boolean;

  constructor(
    private route: ActivatedRoute,
    private advertiserService: AdvertiserService,
    private userSessionService: UserSessionService,
    private deviceDetectorService: DeviceDetectorService
  ) { }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.stopRedirect = true;
  }

  ngOnInit() {
    this.stopRedirect = false;
    this.userSessionService.isApp().subscribe((isApp) => {
      this.isApp = isApp;
    });

    this.advertiserService
      .getAdvertiserByUri(this.route.snapshot.paramMap.get('nameUri'))
      .subscribe((advertiser: any) => {
        this.advertiser = advertiser;
        let params: HttpParams = new HttpParams({
          fromObject: {
            ...this.route.snapshot.queryParams,
            ...{ idAdvertiser: this.advertiser.advertiserDto.id, channel: 'farmaciaai' }
          }
        });

        this.urlRedirect = `${this.advertiser.netGroup.webSite}?${params}`;
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.stopRedirect) {
        if (this.isApp) {
          window['webkit'].messageHandlers.cordova_iab.postMessage(JSON.stringify(
            {
              action: 'open-native-browser',
              url: this.urlRedirect
            }
          ));
          window.history.back();
        } else {
          window.location.replace(this.urlRedirect)
        }
      }
    }, 3000);
  }
}
