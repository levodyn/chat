import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatfeedComponent } from './components/chatfeed/chatfeed.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { LoginComponent } from './components/login/login.component';

import { AppRoutingModule } from './routes';
import { FormsModule} from '@angular/forms';
import { UsersService } from './services/users.service';
import { MessagesService } from './services/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    NavbarComponent,
    ChatfeedComponent,
    ChatInputComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UsersService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
