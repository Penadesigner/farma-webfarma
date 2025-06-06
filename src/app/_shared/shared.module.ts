import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCollapse, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxMaskModule } from 'ngx-mask';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { GoogleAdsComponent } from './components/google-ads/google-ads.component';
import { ModalAddressComponent } from './components/modal-address/modal-address.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';
import { TrackableDirective } from './directives/trackable.directive';
import { JsonLDPipe } from './pipes/json-ld.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { PrepareUriPipe } from './pipes/prepare-uri.pipe';
import { RemoveUnknownCharsPipe } from './pipes/remove-unknown-chars.pipe';
import { SharedRoutingModule } from './shared-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { StoresRankTableComponent } from './components/stores-rank-table/stores-rank-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    StorageServiceModule,
    NgbModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    NgxJsonLdModule
  ],
  declarations: [
    PaginationComponent,
    CategoryListComponent,
    ModalAddressComponent,
    ProductCardComponent,
    PrepareUriPipe,
    PhonePipe,
    RemoveUnknownCharsPipe,
    JsonLDPipe,
    StoresListComponent,
    GoogleAdsComponent,
    TrackableDirective,
    SpinnerComponent,
    StoresRankTableComponent
  ],
  providers: [
    PrepareUriPipe,
    RemoveUnknownCharsPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (service: SpinnerService) => new SpinnerInterceptor(service),
      multi: true,
      deps: [SpinnerService]
    }],
  exports: [
    PaginationComponent,
    CategoryListComponent,
    ModalAddressComponent,
    ProductCardComponent,
    NgbCollapse,
    NgbModule,
    FormsModule,
    NgxMaskModule,
    NgxJsonLdModule,
    PrepareUriPipe,
    PhonePipe,
    RemoveUnknownCharsPipe,
    JsonLDPipe,
    StoresListComponent,
    SpinnerComponent,
    TrackableDirective,
    StoresRankTableComponent
  ]
})
export class SharedModule { }
