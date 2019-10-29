import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwayminiComponent } from './geekwaymini.component';

describe('GeekwayminiComponent', () => {
  let component: GeekwayminiComponent;
  let fixture: ComponentFixture<GeekwayminiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwayminiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekwayminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
