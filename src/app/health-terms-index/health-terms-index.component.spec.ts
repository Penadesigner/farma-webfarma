import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTermsIndexComponent } from './health-terms-index.component';

describe('HealthTermsIndexComponent', () => {
  let component: HealthTermsIndexComponent;
  let fixture: ComponentFixture<HealthTermsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthTermsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthTermsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
