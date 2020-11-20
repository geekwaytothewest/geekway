import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { OembedService } from './oembed.service';

describe('OembedService', () => {
  let service: OembedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(OembedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
