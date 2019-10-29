import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwaymicroComponent } from './geekwaymicro.component';

describe('GeekwaymicroComponent', () => {
  let component: GeekwaymicroComponent;
  let fixture: ComponentFixture<GeekwaymicroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaymicroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekwaymicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
