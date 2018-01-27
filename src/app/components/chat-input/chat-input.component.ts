import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  input:string;
  constructor(private _message:MessagesService, private _user:UsersService) { }

  ngOnInit() {
  }

  send(){
    this._message.sendMessage(this.input,this._user.getUser().name);
  }

}
