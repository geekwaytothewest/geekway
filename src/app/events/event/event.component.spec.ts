import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IgxCarouselModule } from 'igniteui-angular';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { EventComponent } from './event.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let backend: ApolloTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      imports: [ IgxCarouselModule, MatCardModule, RouterModule.forRoot([]), ApolloTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
