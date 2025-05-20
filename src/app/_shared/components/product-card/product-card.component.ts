import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { PrepareUriPipe } from '../../pipes/prepare-uri.pipe';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input()
  products: Product[];

  @Input()
  direction: string = 'row'

  @Input()
  cardCssClass: string = 'col-10 col-sm-8 col-md-5 my-3 px-3';
  //col-lg-3 col-md-6 

  constructor(
    public prepareUriPipe: PrepareUriPipe
  ) { }

  ngOnInit() {
    this.products = this.products.concat(this.products).concat(this.products);
  }

  onSelectProduct(product: Product) {
    window.location.href = ['/detalhes',
      this.prepareUriPipe.transform(product.nomeCompleto),
      product.ean].join('/');
  }
}
