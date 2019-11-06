import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { PolicyComponent } from './policy.component';
import { RouterModule } from '@angular/router';

describe('PolicyComponent', () => {
  let component: PolicyComponent;
  let fixture: ComponentFixture<PolicyComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyComponent ],
      imports: [ RouterModule.forRoot([]), ApolloTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
