import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services//users.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:string;
  constructor(private _user:UsersService, private _router:Router) { }

  ngOnInit() {
    this.name = "";
  }

  login(){
    if(this.name != "")
    {
      this._user.addUser(this.name);
      this._router.navigate(['/chat']);
    }
  }

}
