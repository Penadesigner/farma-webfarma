import { Component, OnInit } from '@angular/core';
import { Product } from '../_shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { start } from 'repl';
import { PrepareUriPipe } from '../_shared/pipes/prepare-uri.pipe';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit {
  products: Product[];
  letter: String;
  page: number;
  count: number;
  limit: number;
  productType: string;
  pages: [number, string][] = [];
  alphabet: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    public prepareUriPipe: PrepareUriPipe
  ) { }

  ngOnInit() {
    this.productType = this.route.snapshot.url[0].path.replace('-de-A-a-Z', '');
    this.productType = this.productType[0].toUpperCase() + this.productType.slice(1);
    this.title.setTitle(`${this.productType} de A a Z | Farmaciaai - As farmácias mais próximas em um só lugar`);
    let productsPage = this.route.snapshot.data.productsPage;
    if (productsPage) {
      this.products = productsPage.result;
      this.count = productsPage.count;
      this.limit = productsPage.limit;
      this.letter = this.route.snapshot.paramMap.get('letter');
      this.page = parseInt(this.route.snapshot.paramMap.get('page'));
      this.meta.updateTag({
        name: "description",
        content: `${this.productType} iniciados com a letra '${this.letter}'. Leia a bula e compare preços de medicamentos nas farmácias mais próximas de você.`
      });

      setTimeout(() => {
        // this.viewportScroller.setOffset([0, 2]);
        this.viewportScroller.scrollToAnchor('active-letter');
      }, 100)
    }
  }
}
