import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalChartComponent } from './global-chart.component';

describe('GlobalDeathComponent', () => {
  let component: GlobalChartComponent;
  let fixture: ComponentFixture<GlobalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
