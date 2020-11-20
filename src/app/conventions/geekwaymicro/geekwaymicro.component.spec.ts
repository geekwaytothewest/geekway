import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwaymicroComponent } from './geekwaymicro.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatCardModule } from '@angular/material/card';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('GeekwaymicroComponent', () => {
  let component: GeekwaymicroComponent;
  let fixture: ComponentFixture<GeekwaymicroComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwaymicroComponent ],
      imports: [ 
        MomentModule, 
        MomentTimezoneModule, 
        MatCardModule, 
        FlipclockModule,
        IvyCarouselModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
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
