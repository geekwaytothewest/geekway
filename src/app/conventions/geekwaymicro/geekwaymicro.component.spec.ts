import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekwaymicroComponent } from './geekwaymicro.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatCardModule } from '@angular/material';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { IgxCarouselModule, IgxSliderModule, IgxProgressBarModule } from 'igniteui-angular';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
        IgxCarouselModule,
        IgxSliderModule,
        IgxProgressBarModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        ApolloTestingModule,
        RouterTestingModule
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
