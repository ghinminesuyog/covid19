import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalStatisticsComponent } from './national-statistics.component';

describe('NationalStatisticsComponent', () => {
  let component: NationalStatisticsComponent;
  let fixture: ComponentFixture<NationalStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
