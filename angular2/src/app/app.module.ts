import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { DeckComponent } from './deck/deck.component';
import { DecksService } from './decks.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    DeckComponent
  ],
  imports: [
    BrowserModule, AlertModule.forRoot(), appRoutes, HttpModule
  ],
  providers: [DecksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
