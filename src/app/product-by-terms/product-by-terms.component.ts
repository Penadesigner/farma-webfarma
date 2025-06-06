import { Component, OnInit } from '@angular/core';
import { Product } from '../_shared/models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-by-terms',
  templateUrl: './product-by-terms.component.html',
  styleUrls: ['./product-by-terms.component.css']
})
export class ProductByTermsComponent implements OnInit {
  products : Product[];
  term: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.products = this.route.snapshot.data.productsPage.products.result;
    this.term = this.route.snapshot.data.productsPage.term;
  }

}
