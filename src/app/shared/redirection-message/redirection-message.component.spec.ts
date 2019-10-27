import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectionMessageComponent } from './redirection-message.component';

describe('RedirectionMessageComponent', () => {
  let component: RedirectionMessageComponent;
  let fixture: ComponentFixture<RedirectionMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectionMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
