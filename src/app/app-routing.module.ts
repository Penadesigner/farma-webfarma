import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertiserDetailsComponent } from './advertiser-details/advertiser-details.component';
import { ComoFuncionaComponent } from './como-funciona/como-funciona.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { ProductLeafletComponent } from './product-leaflet/product-leaflet.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { StoreRedirectComponent } from './store-redirect/store-redirect.component';
import { StoresByRegionIndexComponent } from './stores-by-region-index/stores-by-region-index.component';
import { StoresByRegionComponent } from './stores-by-region/stores-by-region.component';
import { StoresRankingComponent } from './stores-ranking/stores-ranking.component';
import { AdvertiserDetailsResolver } from './advertiser-details/advertiser-details.resolver';
import { LeafletResolver } from './product-leaflet/leaflet.resolver';
import { ProductIndexResolver } from './product-index/product-index.resolver';
import { ProductResolver } from './_shared/resolvers/product.resolver';
import { StoreDetailsRankingResolver } from './_shared/resolvers/store-details-ranking.resolver';
import { StoreDetailsResolver } from './store-details/store-details.resolver';
import { StoresByRegionResolver } from './stores-by-region/stores-by-region.resolver';
import { ProductByTermsComponent } from './product-by-terms/product-by-terms.component';
import { ProductByTermsResolver } from './product-by-terms/product-by-terms.resolver';
import { HealthTermsIndexResolver } from './health-terms-index/health-terms-index.resolver';
import { HealthTermsIndexComponent } from './health-terms-index/health-terms-index.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'detalhes/:productName/:ean', component: ProductDetailsComponent, resolve: { product: ProductResolver } },
  {
    path: 'bula/:productName/:register', component: ProductLeafletComponent, resolve: {
      products: ProductResolver,
      leaflet: LeafletResolver
    }
  },
  {
    path: 'farmacias-e-drogarias/:state/:locality/:neighbourhood/pagina/:page', pathMatch: 'full', component: StoresByRegionComponent, resolve: {
      storesPage: StoresByRegionResolver
    }
  },
  {
    path: 'farmacias-e-drogarias/:state/:locality/pagina/:page', pathMatch: 'full', component: StoresByRegionComponent, resolve: {
      storesPage: StoresByRegionResolver
    }
  },
  {
    path: 'farmacias-e-drogarias/:state/pagina/:page', pathMatch: 'full', component: StoresByRegionComponent, resolve: {
      storesPage: StoresByRegionResolver
    }
  },
  {
    path: 'farmacias-e-drogarias/:state/:locality/:neighbourhood/:storeName/:cnpj', pathMatch: 'full', component: StoreDetailsComponent, resolve: {
      storesRanking: StoreDetailsRankingResolver,
      storeDetails: StoreDetailsResolver
    }
  },
  { path: 'farmacias-e-drogarias/:state/:locality/:neighbourhood', pathMatch: 'full', redirectTo: 'farmacias-e-drogarias/:state/:locality/:neighbourhood/pagina/1' },
  { path: 'farmacias-e-drogarias/:state/:locality', pathMatch: 'full', redirectTo: 'farmacias-e-drogarias/:state/:locality/pagina/1' },
  { path: 'farmacias-e-drogarias/:state', pathMatch: 'full', redirectTo: 'farmacias-e-drogarias/:state/pagina/1' },
  { path: 'farmacias-e-drogarias', component: StoresByRegionIndexComponent },
  { path: 'medicamentos-de-A-a-Z', component: ProductIndexComponent },
  {
    path: 'medicamentos-de-A-a-Z/:letter/:page', component: ProductIndexComponent, resolve: {
      productsPage: ProductIndexResolver
    }
  },
  { path: 'produtos-de-A-a-Z', component: ProductIndexComponent },
  {
    path: 'produtos-de-A-a-Z/:letter/:page', component: ProductIndexComponent, resolve: {
      productsPage: ProductIndexResolver
    }
  },
  {
    path: 'remedios/:terms', component: ProductByTermsComponent, resolve: {
      productsPage: ProductByTermsResolver
    }
  },
  { path: 'saude-de-A-a-Z', component: HealthTermsIndexComponent },
  {
    path: 'saude-de-A-a-Z/:letter/:page', component: HealthTermsIndexComponent, resolve: {
      termsPage: HealthTermsIndexResolver
    }
  },
  { path: 'busca', component: ProductGridComponent },
  { path: 'ranking-de-farmacias', component: StoresRankingComponent },
  { path: 'planos', component: PricingComponent },
  { path: 'como-funciona', component: ComoFuncionaComponent },
  { path: 'contato', component: ContatoFormComponent },
  { path: 'farmacia/:nameUri', component: StoreRedirectComponent },
  {
    path: 'farmacia-online/:state/:locality/:neighbourhood/:nameUri', pathMatch: 'full',
    component: AdvertiserDetailsComponent, resolve: {
      result: AdvertiserDetailsResolver
    }
  },
  { path: '**', redirectTo: '' }
  /*{
    path: '',
    loadChildren: () => import('./core.).then(m => m.NewItemModule)
  },
  { path: ':medium', component: MediaItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }*/
];

export function appScrollOffset(): [number, number] {
  return [0, document.querySelector('app-header #header-container').scrollHeight + 13]
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollOffset: appScrollOffset
  })],
  providers: [
    ProductResolver,
    LeafletResolver,
    ProductIndexResolver,
    StoresByRegionResolver,
    StoreDetailsResolver,
    AdvertiserDetailsResolver,
    StoreDetailsRankingResolver,
    ProductByTermsResolver,
    HealthTermsIndexResolver
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
