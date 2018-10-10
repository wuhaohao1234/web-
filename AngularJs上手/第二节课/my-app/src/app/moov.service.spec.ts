import { TestBed } from '@angular/core/testing';

import { MoovService } from './moov.service';

describe('MoovService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoovService = TestBed.get(MoovService);
    expect(service).toBeTruthy();
  });
});
