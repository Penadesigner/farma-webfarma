import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresRankTableComponent } from './stores-rank-table.component';

describe('StoresRankTableComponent', () => {
  let component: StoresRankTableComponent;
  let fixture: ComponentFixture<StoresRankTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresRankTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresRankTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
