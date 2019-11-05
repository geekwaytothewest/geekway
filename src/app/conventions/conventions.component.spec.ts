import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsComponent } from './conventions.component';
import { MatTableModule } from '@angular/material';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { IgxCarouselModule, IgxSliderModule, IgxProgressBarModule } from 'igniteui-angular';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConventionsComponent', () => {
  let component: ConventionsComponent;
  let fixture: ComponentFixture<ConventionsComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConventionsComponent ],
      imports: [ 
        MatTableModule, 
        MomentModule, 
        MomentTimezoneModule, 
        ApolloTestingModule, 
        IgxCarouselModule, 
        IgxSliderModule, 
        IgxProgressBarModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
