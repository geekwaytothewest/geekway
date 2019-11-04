import { TestBed } from '@angular/core/testing';

import { HeaderPhotoService } from './header-photo.service';

describe('HeaderPhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderPhotoService = TestBed.get(HeaderPhotoService);
    expect(service).toBeTruthy();
  });
});
