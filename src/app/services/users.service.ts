import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class UsersService {
  private user:User;
  private key:any;
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.afAuth.auth.signInAnonymously();
   }

  all(){
    let users: Observable<any[]> = this.db.list('/users', ref => ref.orderByChild('lastSeen')).valueChanges();
    return users;
  }

  getUser(){
    return this.user;
  }

  getKey(){
    return this.key;
  }

  //searchUser(name){
  //  let user = this.db.list('/users', ref => ref.orderByChild('name').equalTo(name)).valueChanges();
  //  return user;
  //}

  setUser(name, date){
    let user:User = {name: name, lastSeen: date};
    this.user = user;
  }

  addUser(name){
    let user:User = {name: name, lastSeen: (new Date).toString()};
    this.user = user;
    console.log(user);
    this.key = this.db.list("users").push(user).key;
  }

  removeUser(){
    this.db.object('/users/' + this.key).remove();
  }

  ngOnDestroy(){
    this.afAuth.auth.signOut();
  }

}
