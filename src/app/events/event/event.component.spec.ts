import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IgxCarouselModule } from 'igniteui-angular';

import { EventComponent } from './event.component';
import { MatCardModule } from '@angular/material';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      imports: [ IgxCarouselModule, MatCardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
