import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RedirectionMessageComponent } from './redirection-message.component';

describe('RedirectionMessageComponent', () => {
  let component: RedirectionMessageComponent;
  let fixture: ComponentFixture<RedirectionMessageComponent>;

  beforeEach(waitForAsync(() => {
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
