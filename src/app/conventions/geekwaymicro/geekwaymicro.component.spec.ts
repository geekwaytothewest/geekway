import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeekwaymicroComponent } from './geekwaymicro.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('GeekwaymicroComponent', () => {
  let component: GeekwaymicroComponent;
  let fixture: ComponentFixture<GeekwaymicroComponent>;
  let backend: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaymicroComponent ],
      imports: [
        MomentModule,
        MomentTimezoneModule,
        MatCardModule,
        FlipclockModule,
        ApolloTestingModule,
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekwaymicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
