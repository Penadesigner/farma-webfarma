import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_shared/models/product.model';

@Component({
  selector: 'app-product-leaflet',
  templateUrl: './product-leaflet.component.html',
  styleUrls: ['./product-leaflet.component.css']
})
export class ProductLeafletComponent implements OnInit, AfterViewInit {
  data: any;
  products: Product[];
  product: Product;
  hello: string;
  zoom: number = 1;

  constructor(
    private sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.data = this.sanitizer.bypassSecurityTrustHtml(this.route.snapshot.data.leaflet);
    this.products = this.route.snapshot.data.products.sort(
      (a: Product, b: Product) => {
        return b.numAdv - a.numAdv
      });
    // this.products = this.products.concat(this.products.concat(this.products));
    this.product = this.products[0];
    this.title.setTitle(`${this.product.nomeCurto} - Compare preços e veja a bula (${this.product.marca})`);
    if (this.product.detalhes.descricao) {
      this.meta.updateTag({
        name: "description",
        content: `${this.product.detalhes.descricao}`
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let win_width = window.outerWidth < 768 ? window.outerWidth : 768;
      let divs = document.querySelectorAll('#leaflet-div > div')
      divs.forEach((div: any) => {
        let width = div.offsetWidth;
        let zoom = 0.90 * (win_width / width);
        div.style.zoom = zoom;
      })
    }
  }

  zoomLeaflet(i: number) {
    this.zoom = this.zoom + i;
    this.zoom = this.zoom < 1 ? 1 : this.zoom;

    let leaflet: any = document.querySelector('#leaflet-div');
    leaflet.style.zoom = this.zoom;

    let leafletContainer = document.querySelector('#leaflet-container');
    leafletContainer.scrollLeft = this.zoom == 1 ? 0 : leafletContainer.scrollLeft * (1 + i);
  }

}
