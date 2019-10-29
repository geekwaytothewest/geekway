import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwaytothewestComponent } from './geekwaytothewest.component';

describe('GeekwaytothewestComponent', () => {
  let component: GeekwaytothewestComponent;
  let fixture: ComponentFixture<GeekwaytothewestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaytothewestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekwaytothewestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
