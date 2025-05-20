import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByTermsComponent } from './product-by-terms.component';

describe('ProductByTermsComponent', () => {
  let component: ProductByTermsComponent;
  let fixture: ComponentFixture<ProductByTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductByTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductByTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
