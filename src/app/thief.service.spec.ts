import { TestBed } from '@angular/core/testing';

import { ThiefService } from './thief.service';

describe('ThiefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThiefService = TestBed.get(ThiefService);
    expect(service).toBeTruthy();
  });
});
