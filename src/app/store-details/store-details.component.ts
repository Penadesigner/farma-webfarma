import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { SearchService } from '../_shared/services/search.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {
  store: any;
  referencePoint: string;
  fullAddress: string;
  googleMapsUrl: SafeResourceUrl;
  googlePlacesUrl: SafeResourceUrl;
  phone: string;
  breadcrumbItems;
  storesRanking:Array<any>;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private searchService: SearchService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    // console.log(this.route.snapshot.data)
    this.store = this.route.snapshot.data.storeDetails;
    this.storesRanking = this.route.snapshot.data.storesRanking;
    this.fullAddress = `${this.store.address.street}, ${this.store.address.neighbourhood}, `
      + `${this.store.address.locality} - ${this.store.address.state}`;

    this.title.setTitle(`Farmácia Aí - ${this.store.name} ${this.store.address.neighbourhood} ${this.store.address.locality}`);
    this.meta.updateTag({
      name: "description",
      content: `Veja os detalhes e telefone da farmácia ${this.store.name} de ${this.fullAddress}`
    })


    this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?zoom=14&q=${this.fullAddress}&key=AIzaSyBmbNlD_XKgxu5J_2Bof_9rfuQefRE0EXk`
    )

    if (this.route.snapshot.queryParamMap.get('lat')
      && this.route.snapshot.queryParamMap.get('lng')) {
      this.referencePoint = 'do seu endereço'
    }
    else {
      this.referencePoint = 'do centro de ' + this.store.address.neighbourhood;
    }
    this.loadBreadCrumbItems();
  }
  private loadBreadCrumbItems() {
    let state = this.store.address.state
    let city = this.store.address.locality.replace(/-/g, ' ');
    let neighbourhood = this.store.address.neighbourhood.replace(/-/g, ' ');
    this.breadcrumbItems = [['Farmácias e Drogarias', '/farmacias-e-drogarias']];

    this.breadcrumbItems.push([state, [
      '/farmacias-e-drogarias',
      this.store.address.state].join('/')]);

    this.breadcrumbItems.push([city, [
      '/farmacias-e-drogarias',
      this.store.address.state,
      this.store.address.locality].join('/')]);
  
    this.breadcrumbItems.push([neighbourhood, [
      '/farmacias-e-drogarias',
      this.store.address.state,
      this.store.address.locality,
      this.store.address.neighbourhood].join('/')])

    this.breadcrumbItems.push([ `${this.store.name} em ${this.fullAddress}`, null]);
  }

  goToStorePlacesPage() {
    if (!this.googlePlacesUrl) {
      this.searchService.getStorePlaceId(this.store).pipe(delay(5000)).subscribe(
        placeId => this.googlePlacesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.google.com/maps/search/?api=1&query=${encodeURI(this.store.name)}&query_place_id=${placeId}`
        ), () => this.googlePlacesUrl = 'Error')
    }
  }

}
