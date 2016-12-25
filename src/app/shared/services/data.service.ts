import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { devConsole } from '../console';

@Injectable()
export class DataService {

  constructor(private _http:Http) { }

  getData() {
    return this._http.get("http://choniawko.com/api/users-create")
      .map(res => res.json())
      .do(res => devConsole.log(res))
  }

}
