import { TestBed } from '@angular/core/testing';

import { ContractDetail } from './contract-detail';

describe('ContractDetail', () => {
  let service: ContractDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
