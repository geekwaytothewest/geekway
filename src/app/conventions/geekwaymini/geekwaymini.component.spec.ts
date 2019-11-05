import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwayminiComponent } from './geekwaymini.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatCardModule } from '@angular/material';

describe('GeekwayminiComponent', () => {
  let component: GeekwayminiComponent;
  let fixture: ComponentFixture<GeekwayminiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwayminiComponent ],
      imports: [ MomentModule, MomentTimezoneModule, MatCardModule ]
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
