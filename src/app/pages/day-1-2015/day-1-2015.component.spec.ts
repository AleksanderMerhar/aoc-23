import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day12015Component } from './day-1-2015.component';

describe('Day12015Component', () => {
  let component: Day12015Component;
  let fixture: ComponentFixture<Day12015Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day12015Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day12015Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
