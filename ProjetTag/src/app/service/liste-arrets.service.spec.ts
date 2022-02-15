import { TestBed } from '@angular/core/testing';

import { ListeArretsService } from './liste-arrets.service';

describe('ListeArretsService', () => {
  let service: ListeArretsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeArretsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
