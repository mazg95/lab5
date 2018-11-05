import { Inject, Injectable } from '@angular/core';
import { Session } from './session';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
;
  constructor() {}

  base_url = environment.EndPoint;

  getSessions() {
    return fetch(this.base_url, { method: 'GET', mode: 'cors'})
  }

  getSession(id:string){
    return fetch(this.base_url + id, { method: 'GET', mode: 'cors'})
  }

  newSession(session:Session) {
    return fetch(this.base_url, { method: 'POST',
     mode: 'cors', body: JSON.stringify(session),
     headers: {'Content-Type': 'application/json'}
    })
  }

  saveSession(session:Session){
    return fetch(this.base_url + session._id, { method: 'PUT', mode: 'cors', body: JSON.stringify(session),
    headers: {'Content-Type': 'application/json'}})
  }

  removeSession(session_id:number){
    return fetch(this.base_url + session_id, { method: 'DELETE', mode: 'cors'})
  }
}
