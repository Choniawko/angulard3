/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { Http, BaseRequestOptions, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
        provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
      }, deps: [MockBackend, BaseRequestOptions]
      },
      {provide: MockBackend, useClass: MockBackend},
      {provide: BaseRequestOptions, useClass: BaseRequestOptions},
        DataService,
        ]
    });
  });

  it('should ...', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should get 9 element list user array', inject([DataService], (service: DataService) => {
    service.getData().subscribe((users) => {
      expect(users.length).toEqual(9);
    });
  }));

  });
