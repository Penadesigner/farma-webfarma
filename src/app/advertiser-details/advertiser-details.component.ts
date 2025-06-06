import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Address } from '../_shared/models/address.model';
import { SearchService } from '../_shared/services/search.service';

@Component({
  selector: 'app-advertiser-details',
  templateUrl: './advertiser-details.component.html',
  styleUrls: ['./advertiser-details.component.css']
})
export class AdvertiserDetailsComponent implements OnInit {
  store;
  breadcrumbItems;
  referencePoint: string;
  fullAddress: string;
  googleMapsUrl: SafeResourceUrl;
  googlePlacesUrl: SafeResourceUrl;
  userAddress: Address;
  storesRanking: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private searchService: SearchService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.store = this.route.snapshot.data.result.advertiser.advertiserDto;
    this.storesRanking = this.route.snapshot.data.result.storesRanking;

    this.store.activities = ['Perfumes',
      'Correlatos',
      'Alimentos permitidos',
      'Produtos de Higiene',
      'Cosméticos'];

    this.fullAddress = `${this.store.address.street}, ${this.store.address.number}, `
      + `${this.store.address.neighbourhood}, `
      + `${this.store.address.locality} - ${this.store.address.state}`;
    this.fullAddress = this.fullAddress.replace(/, ,/g, ", ");

    this.title.setTitle(`Farmácia Aí - ${this.store.name}` +
      ` ${this.store.address.neighbourhood} ${this.store.address.locality}`);
    this.meta.updateTag({
      name: "description",
      content: `Veja os detalhes e compre online na farmácia ${this.store.name} de ${this.fullAddress}`
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

    this.breadcrumbItems.push([`${this.store.name} em ${this.fullAddress}`, null]);
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
