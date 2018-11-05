import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Session } from '../session';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  constructor(private sessionService: SessionService) { }
  
  ngOnInit() {
      this.getSessions();
  }


  onSessionDelete(session){
    console.log(session._id);
    var self = this;
      Swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this data session!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          self.sessionService.removeSession(session._id)
          .then(res => res.status == 204)
          .then(val =>{self.getSessions()
           Swal(
          'Deleted!',
          'Your data session has been deleted.',
          'success')})
          .catch(err => Swal('Not Deleted!',
          'Retry Later.',
          'error'))
        } 
      });
  }

  sessions: Session[];

  getSessions(): void {
    let self = this;
    this.sessionService.getSessions()
      .then(res=>res.json())
      .then(sessions => self.sessions = sessions)
      .catch(err => alert(`Ha Ocurrido un error ${err}`));
  }
}
