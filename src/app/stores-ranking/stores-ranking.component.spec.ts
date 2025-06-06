import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresRankingComponent } from './stores-ranking.component';

describe('StoresRankingComponent', () => {
  let component: StoresRankingComponent;
  let fixture: ComponentFixture<StoresRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
