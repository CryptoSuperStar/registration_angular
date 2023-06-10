import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegService } from './reg.service';

describe('RegService', () => {
  let service: RegService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
