import { TestBed } from '@angular/core/testing';

import { NextGeekwayService } from './next-geekway.service';

describe('NextGeekwayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NextGeekwayService = TestBed.get(NextGeekwayService);
    expect(service).toBeTruthy();
  });
});
