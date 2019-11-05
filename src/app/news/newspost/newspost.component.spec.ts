import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { NewspostComponent } from './newspost.component';
import { MomentTimezoneModule } from 'src/app/shared/moment-timezone/moment-timezone.module';
import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';

describe('NewspostComponent', () => {
  let component: NewspostComponent;
  let fixture: ComponentFixture<NewspostComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspostComponent ],
      imports: [ MomentTimezoneModule, MomentModule, RouterModule.forRoot([]), ApolloTestingModule ]
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
