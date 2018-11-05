import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
 
import { Session }         from '../session';
import { SessionService }  from '../session.service';
 

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private location: Location
  ) {}

  session: Session;
  isNew: boolean = true;

  ngOnInit() {
    this.getSession();
  }

  getSession(): void {
    const id = this.route.snapshot.paramMap.get('id');
    let self = this;
    this.session = new Session();
    if(id){
      this.isNew = false;
      this.sessionService.getSession(id)
      .then(res=>res.json())
      .then(s => {self.session = s[0];
      })
      .catch(error => console.error(error));
    }
  }

  saveSession(){
    let self = this;
    if(this.isNew){
      this.sessionService.newSession(this.session)
      .then(res => {
        if(res.status === 201)
          return {statusCode:201}
        else
          return res.json()
      })
      .then(res => {
        if(res.statusCode === 201){
          self.goBack();
        }
        else {
          alert(JSON.stringify(res.message));          
        }
      })
      .catch(error => console.log(error))
    }
    else {
      this.sessionService.saveSession(this.session)
      .then(res => {
        if(res.status === 204)
          return {statusCode:204}
        else
          return res.json()
      })
      .then(res => {
        if(res.statusCode === 204){
          self.goBack();
        } else {
          alert(JSON.stringify(res.message));          
        }
      })
      .catch(error => console.error(error))
    }
  }
 
  goBack(): void {
    this.location.back();
  }
}
