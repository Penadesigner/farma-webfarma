import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../_shared/models/address.model';
import { SearchService } from '../_shared/services/search.service';
import { UserAddressService } from '../_shared/services/user-address.service';
import { Product } from '../_shared/models/product.model';
import { PrepareUriPipe } from '../_shared/pipes/prepare-uri.pipe';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  address: Address;
  keywords: string;
  products: Product[] = [];
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
    private userAddressService: UserAddressService,
    public prepareUriPipe: PrepareUriPipe
  ) { }

  ngOnInit() {
    this.keywords = this.route.snapshot.queryParamMap.get('termos')
    this.userAddressService.currentAddress.
      subscribe((address: Address) => {
        this.address = address;
        this.getProducts();
      }
      );
  }

  getProducts() {
    if (this.keywords) {
      this.searchService.autocomplete(this.keywords, this.address, 20)
        .subscribe((response: any[]) => {
          this.products = response;
          this.loaded = true;
        })
    }
  }

  onSelect(product: Product) {
    this.router.navigate(
      ['/detalhes',
        this.prepareUriPipe.transform(product.nomeCompleto),
        product.ean]);
  }

}
