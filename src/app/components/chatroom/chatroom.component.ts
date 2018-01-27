import { Component, OnInit, ViewChild,AfterViewChecked, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'; 

import { UsersService } from '../../services//users.service';
import { User } from '../../models/user';

@Component({
  selector: 'chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked{
  users:Observable<any[]>; 
  userRev:User[];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  
  constructor(private _user:UsersService, private _router:Router) { }

  ngOnInit() {
    if(!this._user.getUser()){
      this._router.navigate(['/login']);
    }
    this.users = this._user.all();
    this.users.subscribe(rev=> this.userRev = rev.reverse());
    this.scrollToBottom();
  }

  report(){
    this.scrollToBottom();
    console.log(this.myScrollContainer.nativeElement.scrollTop + ' ' + this.myScrollContainer.nativeElement.scrollToBottom );
    console.log(this.myScrollContainer);
    //this.users.subscribe(res => console.log(res));
  }

  status(user:User){
    let timeDiffMin = (Date.parse((new Date).toString()) - Date.parse(user.lastSeen)) /1000 / 60; //diff in minutes
    if(timeDiffMin < 2 ){ return 'online';}
    else if (timeDiffMin < 30 ){ return 'busy';} 
    else {return 'offline';}
  }

  timeDiff(user){
    return  (Date.parse((new Date).toString()) - Date.parse(user.lastSeen)) /1000 / 60; //diff in minutes;    
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
  this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //console.log(this.myScrollContainer.nativeElement.scrollTop);
  //this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
}

ngOnDestroy(){
  this._user.removeUser();
}

}
