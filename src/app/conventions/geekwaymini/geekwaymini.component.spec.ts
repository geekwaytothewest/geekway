import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { GeekwayminiComponent } from './geekwaymini.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatCardModule } from '@angular/material';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { IgxCarouselModule } from 'igniteui-angular';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { RouterTestingModule } from '@angular/router/testing';

describe('GeekwayminiComponent', () => {
  let component: GeekwayminiComponent;
  let fixture: ComponentFixture<GeekwayminiComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeekwayminiComponent ],
      imports: [ 
        MomentModule, 
        MomentTimezoneModule, 
        MatCardModule, 
        FlipclockModule, 
        AgmCoreModule, 
        IgxCarouselModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        ApolloTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeekwayminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
