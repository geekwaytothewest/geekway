import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { ConventionComponent } from './convention.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatCardModule, MatTableModule, MatInputModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { IgxCarouselModule, IgxSliderModule, IgxProgressBarModule } from 'igniteui-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConventionComponent', () => {
  let component: ConventionComponent;
  let fixture: ComponentFixture<ConventionComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConventionComponent ],
      imports: [ 
        MomentModule, 
        MomentTimezoneModule, 
        MatCardModule, 
        FlipclockModule, 
        IgxSliderModule,
        IgxCarouselModule, 
        IgxProgressBarModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        ApolloTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
