import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../../services/users.service';
import { MessagesService } from '../../services/messages.service';
import { ScrollService } from '../../services/scroll.service';
import { Message } from '../../models/message';

@Component({
  selector: 'chatfeed',
  templateUrl: './chatfeed.component.html',
  styleUrls: ['./chatfeed.component.css']
})
export class ChatfeedComponent implements OnInit {
  messages:Observable<Message[]>;
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private _user:UsersService, private _message:MessagesService){}
  
    ngOnInit(){
      //this.afAuth.auth.signInAnonymously();
      this.messages = this._message.getMessages();
    }
  
    ngOnDestroy(){
      //this.afAuth.auth.signOut();
    }

    report(){
      console.log(this.messages.subscribe(res => console.log(res)));
    }

    send(){
      console.log(this._user.getKey());
      //this.sendMessage('hallo', this._user.getUser());
    }

    getTimeStamp(){
      const now = new Date();
      const date = now.getDay() + '/' + (now.getMonth()+1) + '/' + now.getFullYear()  ;
      const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()  ;
      return date + ' ' + time;
    }
}
