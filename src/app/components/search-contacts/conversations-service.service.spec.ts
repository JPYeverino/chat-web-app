import { TestBed } from '@angular/core/testing';

import { ConversationsServiceService } from './conversations-service.service';

describe('ConversationsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversationsServiceService = TestBed.get(ConversationsServiceService);
    expect(service).toBeTruthy();
  });
});
