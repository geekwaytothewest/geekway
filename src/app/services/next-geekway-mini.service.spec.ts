import { TestBed } from '@angular/core/testing';

import { NextGeekwayMiniService } from './next-geekway-mini.service';

describe('NextGeekwayMiniService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NextGeekwayMiniService = TestBed.get(NextGeekwayMiniService);
    expect(service).toBeTruthy();
  });
});
