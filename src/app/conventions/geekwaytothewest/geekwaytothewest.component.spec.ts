import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { GeekwaytothewestComponent } from './geekwaytothewest.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatCardModule } from '@angular/material/card';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { RouterTestingModule } from '@angular/router/testing';

describe('GeekwaytothewestComponent', () => {
  let component: GeekwaytothewestComponent;
  let fixture: ComponentFixture<GeekwaytothewestComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaytothewestComponent ],
      imports: [ 
        MomentModule, 
        MomentTimezoneModule, 
        MatCardModule, 
        FlipclockModule,
        IvyCarouselModule, 
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        ApolloTestingModule,
        RouterTestingModule
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
