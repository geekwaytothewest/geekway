import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { GeekwaytothewestComponent } from './geekwaytothewest.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('GeekwaytothewestComponent', () => {
  let component: GeekwaytothewestComponent;
  let fixture: ComponentFixture<GeekwaytothewestComponent>;
  let backend: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaytothewestComponent ],
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
    fixture = TestBed.createComponent(GeekwaytothewestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
