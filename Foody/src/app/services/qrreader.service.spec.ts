import { TestBed } from '@angular/core/testing';

import { QRReaderService } from './qrreader.service';

describe('QRReaderService', () => {
  let service: QRReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
