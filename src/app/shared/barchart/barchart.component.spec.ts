/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarchartComponent } from './barchart.component';
import { Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DataService } from '../services/data.service';

describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;
  let users:any[];
  let dataService: DataService;
  let spy:any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    
    //component.getData();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('getData', () => {

    dataService.getData().subscribe(data => {
      expect(component.users).toBeTruthy();
    });        
    

  });
  
});
