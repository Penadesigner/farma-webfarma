import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { UserAddressService } from 'src/app/_shared/services/user-address.service';
import { UserSessionService } from 'src/app/_shared/services/user-session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  states: Array<[string, string]>;
  showingMore: boolean = false;
  showAppStores: boolean = false;
  showBuyOnline: boolean = false;

  constructor(
    private userAddressService: UserAddressService,
    private userSessionService: UserSessionService
  ) { }

  ngOnInit() {
    this.states = this.userAddressService.getStatesList();
    this.userSessionService.getOneSignalID().pipe(debounceTime(3000)).subscribe(
      (oneSignalID) => {
        if (!oneSignalID || oneSignalID.length < 1) {
          this.showAppStores = true;
        }
      })

    // this.userSessionService.getBottonBannerViewd().pipe(debounceTime(500)).subscribe(
    //   (bottonBannerViewd) => {
    //     if (!bottonBannerViewd) {
    //       this.showBuyOnline = true;
    //       this.userSessionService.setBottonBannerViewd(true);
    //     }
    //   })
  }

  hideAppStores() {
    this.showAppStores = false;
  }

  hideBuyOnline() {
    this.showBuyOnline = false;
  }

  toggleStates() {
    if (this.showingMore)
      document.querySelectorAll('.more-items').forEach(item => item.classList.add('d-none'));
    else
      document.querySelectorAll('.more-items').forEach(item => item.classList.remove('d-none'));
    this.showingMore = !this.showingMore
  }

}
