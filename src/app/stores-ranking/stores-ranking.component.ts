import { Component, OnInit } from '@angular/core';
import { SearchService } from '../_shared/services/search.service';
import { Address } from '../_shared/models/address.model';

@Component({
  selector: 'app-stores-ranking',
  templateUrl: './stores-ranking.component.html',
  styleUrls: ['./stores-ranking.component.css']
})
export class StoresRankingComponent implements OnInit {
  stores: any[]
  constructor(
    private searchService: SearchService
  ) { }
  getAdvertiserRankingByCoords
  ngOnInit() {
    let address: Address = new Address;
    address.neighbourhood = "Bangu";
    address.geo = { lat: -22.8845479, lng: -43.4717889 }
    this.searchService.getAdvertiserRankingByCoords(address).subscribe((advertisers: any[]) => {
      this.stores = advertisers.map((adv)=>{ return adv.advertiserDto});
    })
  }
}
