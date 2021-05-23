import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMapGraphComponent } from './global-map-graph.component';

describe('GlobalMapGraphComponent', () => {
  let component: GlobalMapGraphComponent;
  let fixture: ComponentFixture<GlobalMapGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalMapGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMapGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
