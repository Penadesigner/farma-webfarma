import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  WithContext,
  BreadcrumbList,
  ListItem,
  Product as ProductLD,
  AggregateOffer as AggregateOfferLD
} from 'schema-dts';
import { Product } from '../models/product.model';
import { PrepareUriPipe } from './prepare-uri.pipe';

@Pipe({
  name: 'jsonLD'
})
export class JsonLDPipe implements PipeTransform {
  constructor(private prepareUriPipe: PrepareUriPipe) {

  }

  transform(value: any, ...args: any[]): any {
    if (args.length == 0) {
      args[0] = 'Product'
    }
    switch (args[0]) {
      case 'Product':
        if (!Array.isArray(value))
          return this.productAsJsonLD(value);
        return this.productArrayAsJsonLD(value);

      case 'BreadcrumbList':
        return this.breadCrumbAsJsonLD(value);
    }

    return null;
  }

  productArrayAsJsonLD(products: Array<Product>): Array<WithContext<ProductLD>> {
    let result: Array<WithContext<ProductLD>> = [];
    products.forEach(product => {
      if (product.minPrice) {
        result.push(this.productAsJsonLD(product))
      }
    });
    return result
  }

  productAsJsonLD(product: Product): WithContext<ProductLD> {
    if (!product.minPrice) {
      return null;
    }
    var offersLD: WithContext<AggregateOfferLD> = {
      "@context": "https://schema.org",
      "@type": "AggregateOffer"
    }
    var productLD: WithContext<ProductLD> = {
      "@context": "https://schema.org",
      "@type": "Product"
    }
    productLD.name = product.nomeCompleto;
    productLD.image = ['https://images.webfarmas.com.br/' + product.ean + '.jpg'];
    productLD.brand = { "@type": "Organization", "name": product.marca }
    productLD.gtin13 = product.ean;
    productLD.description = product.descricao;

    offersLD.lowPrice = product.minPrice;
    offersLD.highPrice = product.maxPrice;
    offersLD.offerCount = product.numAdv;
    offersLD.priceCurrency = 'BRL'
    // offersLD.itemOffered = JSON.parse(JSON.stringify(productLD));
    // offersLD.priceValidUntil = formatDate((new Date()).getDate() + 3, 'yyyy-MM-dd', 'pt');
    offersLD.url = ['/detalhes',
      this.prepareUriPipe.transform(product.nomeCompleto),
      product.ean].join('/');

    productLD.offers = offersLD;

    return productLD;
  }

  breadCrumbAsJsonLD(items: Array<[string, string]>): WithContext<BreadcrumbList> {
    var breadCrumb: WithContext<BreadcrumbList> = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList"
    }
    breadCrumb.itemListElement = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i][1]) {
        let listItem: WithContext<ListItem> = {
          "@context": "https://schema.org",
          "@type": "ListItem"
        }
        listItem.position = breadCrumb.itemListElement.length + 1;
        listItem.name = items[i][0];
        listItem.item = environment.rootUrl + items[i][1];
        breadCrumb.itemListElement.push(listItem);
      }
    }
    if (breadCrumb.itemListElement.length == 0)
      return null;
    return breadCrumb;
  }
}