import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-modal';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { DeckComponent } from './deck/deck.component';
import { DecksService } from './services/decks.service';
import { UserService } from './services/user.service'
import { AuthenticationService } from './services/authentication.service';
import { HeaderBasicService } from './services/base/header-basic.service';
import { HttpModule } from '@angular/http';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    DeckComponent,
    DeckDetailsComponent,
    CreateDeckComponent,
    CardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, AlertModule.forRoot(), appRoutes, HttpModule, FormsModule, ReactiveFormsModule, ModalModule, HttpClientModule
  ],
  providers: [DecksService, AuthenticationService, UserService, HeaderBasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
