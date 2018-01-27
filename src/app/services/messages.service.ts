import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { Message } from '../models/message';

@Injectable()
export class MessagesService {

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) { }

  getMessages(): Observable<Message[]> {
    return this.db.list('/messages', ref => ref.limitToLast(25).orderByKey()).valueChanges();
  }

  sendMessage(body,user){
    let message:Message;
    message = {message: body, userName: user, timeSent: this.getTimeStamp() };
    this.db.list("messages").push(message);
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getDay() + '/' + (now.getMonth()+1) + '/' + now.getFullYear()  ;
    const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()  ;
    return date + ' ' + time;
  }
}
