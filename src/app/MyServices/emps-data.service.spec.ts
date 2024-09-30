import { TestBed } from '@angular/core/testing';

import { EmpsDataService } from './emps-data.service';

describe('EmpsDataService', () => {
  let service: EmpsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
