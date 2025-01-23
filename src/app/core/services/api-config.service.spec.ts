import { TestBed } from '@angular/core/testing';

import { APIConfigService } from './api-config.service';

describe('ApiConfigService', () => {
  let service: APIConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
