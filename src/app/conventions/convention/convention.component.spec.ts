import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { ConventionComponent } from './convention.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { FlipclockModule } from 'src/app/shared/flipclock/flipclock.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConventionComponent', () => {
  let component: ConventionComponent;
  let fixture: ComponentFixture<ConventionComponent>;
  let backend: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConventionComponent ],
      imports: [
        MomentModule,
        MomentTimezoneModule,
        MatCardModule,
        FlipclockModule,
        IvyCarouselModule,
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
