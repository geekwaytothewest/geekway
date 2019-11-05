import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwaymicroComponent } from './geekwaymicro.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';

describe('GeekwaymicroComponent', () => {
  let component: GeekwaymicroComponent;
  let fixture: ComponentFixture<GeekwaymicroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaymicroComponent ],
      imports: [ MomentModule, MomentTimezoneModule ]
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
