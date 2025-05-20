import { registerLocaleData } from '@angular/common';
import extraPtBr from '@angular/common/locales/extra/pt';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdvertiserDetailsComponent } from './advertiser-details/advertiser-details.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComoFuncionaComponent } from './como-funciona/como-funciona.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { ProductLeafletComponent } from './product-leaflet/product-leaflet.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { StoreRedirectComponent } from './store-redirect/store-redirect.component';
import { StoresByRegionIndexComponent } from './stores-by-region-index/stores-by-region-index.component';
import { StoresByRegionComponent } from './stores-by-region/stores-by-region.component';
import { CoreModule } from './_core/core.module';
import { ModalAddressComponent } from './_shared/components/modal-address/modal-address.component';
import { UserAddressService } from './_shared/services/user-address.service';
import { UserSessionService } from './_shared/services/user-session.service';
import { SharedModule } from './_shared/shared.module';
import { StoresRankingComponent } from './stores-ranking/stores-ranking.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProductByTermsComponent } from './product-by-terms/product-by-terms.component';
import { HealthTermsIndexComponent } from './health-terms-index/health-terms-index.component';

registerLocaleData(ptBr, 'pt', extraPtBr);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductDetailsComponent,
    StoreRedirectComponent,
    ComoFuncionaComponent,
    ContatoFormComponent,
    ProductGridComponent,
    ProductLeafletComponent,
    ProductIndexComponent,
    StoresByRegionComponent,
    StoreDetailsComponent,
    StoresByRegionIndexComponent,
    AdvertiserDetailsComponent,
    StoresRankingComponent,
    PricingComponent,
    ProductByTermsComponent,
    HealthTermsIndexComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    UserAddressService,
    UserSessionService,
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [
    AppComponent,

  ],
  entryComponents: [ModalAddressComponent]
})
export class AppModule { }
