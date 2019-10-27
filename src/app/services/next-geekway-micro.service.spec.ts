import { TestBed } from '@angular/core/testing';

import { NextGeekwayMicroService } from './next-geekway-micro.service';

describe('NextGeekwayMicroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NextGeekwayMicroService = TestBed.get(NextGeekwayMicroService);
    expect(service).toBeTruthy();
  });
});
