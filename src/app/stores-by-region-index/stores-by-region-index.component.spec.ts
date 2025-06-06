import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresByRegionIndexComponent } from './stores-by-region-index.component';

describe('StoresByRegionIndexComponent', () => {
  let component: StoresByRegionIndexComponent;
  let fixture: ComponentFixture<StoresByRegionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresByRegionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresByRegionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
