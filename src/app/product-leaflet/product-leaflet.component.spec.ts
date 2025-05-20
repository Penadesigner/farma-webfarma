import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLeafletComponent } from './product-leaflet.component';

describe('ProductLeafletComponent', () => {
  let component: ProductLeafletComponent;
  let fixture: ComponentFixture<ProductLeafletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLeafletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
