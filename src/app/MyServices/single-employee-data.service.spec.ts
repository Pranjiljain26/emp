import { TestBed } from '@angular/core/testing';

import { SingleEmployeeDataService } from './single-employee-data.service';

describe('SingleEmployeeDataService', () => {
  let service: SingleEmployeeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleEmployeeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
