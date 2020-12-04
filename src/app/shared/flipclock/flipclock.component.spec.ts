import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FlipclockComponent } from './flipclock.component';
import { Component } from '@angular/core';

describe('FlipclockComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipclockComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `host-component`,
    template: `<app-flipclock id="testing" date="2019-11-30"></app-flipclock>`
  })
  class TestHostComponent {    
  }
});
