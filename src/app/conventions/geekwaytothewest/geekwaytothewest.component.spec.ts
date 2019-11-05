import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwaytothewestComponent } from './geekwaytothewest.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatCardModule } from '@angular/material';

describe('GeekwaytothewestComponent', () => {
  let component: GeekwaytothewestComponent;
  let fixture: ComponentFixture<GeekwaytothewestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaytothewestComponent ],
      imports: [ MomentModule, MomentTimezoneModule, MatCardModule ]
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
