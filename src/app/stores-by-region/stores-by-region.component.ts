import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../_shared/models/address.model';
import { UserAddressService } from '../_shared/services/user-address.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-stores-by-region',
  templateUrl: './stores-by-region.component.html',
  styleUrls: ['./stores-by-region.component.css']
})
export class StoresByRegionComponent implements OnInit {
  advertisers: Array<any>
  stores: Array<any>
  rankingStores: Array<any>
  subregions: Array<any>
  showingMoreSubregions = false;
  address: Address;
  userAddress: Address;
  isUserAddressInParm: boolean;
  currentPlaceName: string;

  page: number;
  //breadCrumb
  breadcrumbItems: Array<[string, string]>;

  constructor(
    private route: ActivatedRoute,
    private userAddressService: UserAddressService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    let storesPage = this.route.snapshot.data.storesPage;
    // console.log(storesPage);
    this.isUserAddressInParm = (this.route.snapshot.queryParamMap.get('lat') != null
      && this.route.snapshot.queryParamMap.get('lng') != null);
    // this.advertisers = storesPage.advertisers;
    this.stores = storesPage.stores;
    this.subregions = storesPage.subregions.result;
    this.address = storesPage.address;
    this.rankingStores = storesPage.rankingStores;
   
    this.currentPlaceName = (
      this.address.neighbourhood ? `${this.address.neighbourhood}, ${this.address.locality}` : (
        this.address.locality
        || this.address.state))

    this.page = parseInt(this.route.snapshot.paramMap.get('page'));

    this.title.setTitle(`Compre medicamentos online e veja as farmácias próximas de ${this.currentPlaceName}`);
    this.meta.updateTag({
      name: "description",
      content: `As farmácias próximas de você em ${this.currentPlaceName}. Compare preços e compre medicamentos online`
    })

    this.userAddressService.currentAddress.
      subscribe((address: Address) => {
        this.userAddress = address;
      });

    this.loadBreadCrumbItems();
  }

  toggleSubregions() {
    if (this.showingMoreSubregions)
      document.querySelectorAll('.more-items').forEach(item => item.classList.add('d-none'));
    else
      document.querySelectorAll('.more-items').forEach(item => item.classList.remove('d-none'));
    this.showingMoreSubregions = !this.showingMoreSubregions
  }

  private loadBreadCrumbItems() {
    let paramMap = this.route.snapshot.paramMap;
    let state = paramMap.get('state')
    let city = paramMap.get('locality') ? paramMap.get('locality').replace(/-/g, ' ') : null;
    let neighbourhood = paramMap.get('neighbourhood') ? paramMap.get('neighbourhood').replace(/-/g, ' ') : null;
    this.breadcrumbItems = [['Farmácias e Drogarias', '/farmacias-e-drogarias']];
    if (state) {
      this.breadcrumbItems.push([state, [
        '/farmacias-e-drogarias',
        paramMap.get('state')].join('/')]);
      if (city) {
        this.breadcrumbItems.push([city, [
          '/farmacias-e-drogarias',
          paramMap.get('state'),
          paramMap.get('locality')].join('/')]);
        if (neighbourhood) {
          this.breadcrumbItems.push([neighbourhood, [
            '/farmacias-e-drogarias',
            paramMap.get('state'),
            paramMap.get('locality'),
            paramMap.get('neighbourhood')].join('/')])
        }
      }
    }
  }
}
