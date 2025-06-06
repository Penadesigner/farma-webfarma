import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresByRegionComponent } from './stores-by-region.component';

describe('StoresByRegionComponent', () => {
  let component: StoresByRegionComponent;
  let fixture: ComponentFixture<StoresByRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresByRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
