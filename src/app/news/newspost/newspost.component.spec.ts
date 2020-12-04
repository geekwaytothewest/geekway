import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { NewspostComponent } from './newspost.component';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('NewspostComponent', () => {
  let component: NewspostComponent;
  let fixture: ComponentFixture<NewspostComponent>;
  let backend: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspostComponent ],
      imports: [ MomentTimezoneModule, MomentModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }), ApolloTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
