import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddressComponent } from '../_shared/components/modal-address/modal-address.component';
import { Address } from '../_shared/models/address.model';
import { Offer } from '../_shared/models/offer.model';
import { Product } from '../_shared/models/product.model';
import { PrepareUriPipe } from '../_shared/pipes/prepare-uri.pipe';
import { SearchService } from '../_shared/services/search.service';
import { UserAddressService } from '../_shared/services/user-address.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  address: Address;
  product: Product = new Product();
  offers: Offer[] = [];
  priceRequestStore: Offer = new Offer();
  relatedProducts: Product[] = [];
  noOffers: boolean = true;
  page: number;
  stores: any;
  loaded: boolean = false;

  rankingStores: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private searchService: SearchService,
    private userAddressService: UserAddressService,
    private modalService: NgbModal,
    private viewportScroller: ViewportScroller,
    public prepareUriPipe: PrepareUriPipe
  ) { }

  ngOnInit() {
    //REGISTRO DE TESTES 114020009
    this.product = this.route.snapshot.data.product;

    this.title.setTitle(`Comprar ${this.product.nomeCompleto} - Menor Preço nas Farmácias perto de você | FarmáciaAí`);
    this.meta.updateTag({
      name: "description",
      content: `${this.product.nomeCompleto} com menor preço e entrega rápida nas farmácias mais próximas de você`
    })

    this.page = 1;
    this.route.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.get('page') && this.page != parseInt(queryParamMap.get('page'))) {
        this.page = parseInt(queryParamMap.get('page'));
      }
      if (this.address) {
        this.getStores();
      }
    })

    this.userAddressService.currentAddress.
      subscribe((address: Address) => {
        // if (this.address) {
        //   this.router.navigate(['./']);
        // } else {
        this.address = address;
        this.getOffers();
        this.getRelatedProducts();
        this.getPriceRequestStores();
        this.getStores();
        // }
      });
  }

  getPriceRequestStores() {
    this.searchService.getPriceRequestStores(this.route.snapshot.paramMap.get('ean'), this.address).subscribe(response => {
      if (response.length > 0) {
        this.priceRequestStore = response[0];
      }
      else {
        this.priceRequestStore = null;
      }
    })
  }

  getOffers() {
    this.searchService.getOffersByEan(this.route.snapshot.paramMap.get('ean'), this.address)
      .subscribe(response => {
        this.offers = response;
        // console.log(this.offers);
        if (this.offers.length > 0) {
          let stats = (({ maxDistance, maxPrice, minDistance, minPrice, numAdv }) =>
            ({ maxDistance, maxPrice, minDistance, minPrice, numAdv }))(this.offers[0].product);
          this.product = { ...this.product, ...stats }
          this.noOffers = false;
        }
        else this.noOffers = true;
        this.loaded = true;
      })

  }

  getRelatedProducts() {
    if (this.product.nomeCurto) {
      this.searchService.autocomplete(this.product.nomeCurto, this.address)
        .subscribe((response: any[]) => {
          let index = response.findIndex((x) => x.ean == this.product.ean);
          if (index > -1) {
            response.splice(index, 1);
          }
          if (response.length > 4) {
            response.pop();
          }
          this.relatedProducts = response;
        })
    }
  }

  getStores() {
    if (this.address) {
      this.searchService.getStoresByCoords(this.address, 10, 6, 6 * (this.page - 1))
        .subscribe(response => {
          this.stores = response;
        });
      this.searchService.getAdvertiserRankingByCoords(this.address,5,5).subscribe((advertisers: any[]) => {
        this.rankingStores = advertisers.map((adv) => { return {...adv.advertiserDto, ...{nameUri: adv.nameUri}}});
      })
    }
  }

  onSelectRelated(related: Product) {
    window.location.href = ['/detalhes',
      this.prepareUriPipe.transform(related.nomeCompleto),
      related.ean].join('/');
  }

  onSelectOffer(offer: Offer = undefined) {
    if (!offer)
      this.router.navigate(['/contato']);
    else {
      this.router.navigate(
        ['/farmacia',
          offer.nameUri], {
        queryParams: {
          "ean": this.product.ean,
          "cep": this.address.zipcode.replace('-', '')
        }
      });
    }
  }

  onClickVerOfertas() {
    if (!this.address) {
      this.modalService.open(ModalAddressComponent).result.then((response) => {
        this.scrollToOffers();
      });
    }
    else {
      this.scrollToOffers();
    }
  }

  public scrollToStores() {
    setTimeout(() => {
      // this.viewportScroller.setOffset([0, 2]);
      this.viewportScroller.scrollToAnchor('stores');
    }, 100)
  }

  public scrollToOffers() {
    setTimeout(() => {
      // this.viewportScroller.setOffset([0, 2]);
      this.viewportScroller.scrollToAnchor('ofertas');
    }, 100)
  }

  // private addProductToLD() {
  //   var offersLD: WithContext<AggregateOfferLD> = {
  //     "@context": "https://schema.org",
  //     "@type": "AggregateOffer"
  //   }
  //   var productLD: WithContext<ProductLD> = {
  //     "@context": "https://schema.org",
  //     "@type": "Product"
  //   }
  //   productLD.name = this.product.nomeCurto ? this.product.nomeCurto : this.product.nomeCompleto;
  //   productLD.image = ['https://images.webfarmas.com.br/' + this.product.ean + '.jpg'];
  //   productLD.brand = { "@type": "Organization", "name": this.product.marca }
  //   productLD.gtin13 = this.product.ean;
  //   productLD.description = this.removeUnknownChars.transform(this.product.detalhes.descricao);

  //   offersLD.lowPrice = this.product.minPrice;
  //   offersLD.highPrice = this.product.maxPrice;
  //   offersLD.offerCount = this.product.numAdv;
  //   offersLD.priceCurrency = 'BRL'
  //   // offersLD.itemOffered = JSON.parse(JSON.stringify(productLD));
  //   // offersLD.priceValidUntil = formatDate((new Date()).getDate() + 3, 'yyyy-MM-dd', 'pt');
  //   offersLD.url = this.router.url;

  //   productLD.offers = offersLD;

  //   this.productLD = productLD;
  // }
}
