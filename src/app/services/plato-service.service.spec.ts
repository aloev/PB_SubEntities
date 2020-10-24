import { TestBed } from '@angular/core/testing';

import { PlatoServiceService } from './plato-service.service';

describe('PlatoServiceService', () => {
  let service: PlatoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
