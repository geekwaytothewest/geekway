import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { MatCardModule } from '@angular/material';

import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [ ApolloTestingModule, MatCardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
