import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CoreRoutingModule } from './core-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { JsonLdComponent } from './json-ld/json-ld.component';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    JsonLdComponent,
    BreadcrumbComponent],
  imports: [
    SharedModule,
    CommonModule,
    CoreRoutingModule
  ],
  exports: [HeaderComponent,
    FooterComponent,
    JsonLdComponent,
    BreadcrumbComponent]
})
export class CoreModule { }
