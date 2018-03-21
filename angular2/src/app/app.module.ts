import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-modal';
import { HttpClientModule } from '@angular/common/http';
import { FormWizardModule } from 'angular2-wizard';
import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { UserComponent } from './user/user.component';
import { UserFollowDetailComponent } from './user/follow/user.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { DeckComponent } from './deck/deck.component';
import { DecksService } from './services/decks.service';
import { AuthenticationService } from './services/authentication.service';
import { HeaderBasicService } from './services/base/header-basic.service';
import { HttpModule } from '@angular/http';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonContentDirective } from './lesson/lesson-content.directive';
import { RememberCardComponent } from './lesson/remember-card.component';
import { SingleChoiceQuestionComponent } from './lesson/single-choice-question.component';
import { MapQuestionAnswerComponent } from './lesson/map-question-answer.component';
import { SlickCarouselComponent } from './slick/slick-carousel.component';
import { UserService } from './services/user.service';
import { SettingsComponent } from './user/settings.component';
import { SearchDeckComponent } from './header/search_deck.component';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UserFollowDetailComponent,
    LoginComponent,
    SignupComponent,
    DeckComponent,
    DeckDetailsComponent,
    CreateDeckComponent,
    EditDeckComponent,
    CardComponent,
    HeaderComponent,
    LessonComponent,
    LessonContentDirective,
    RememberCardComponent,
    SingleChoiceQuestionComponent,
    MapQuestionAnswerComponent,
    SlickCarouselComponent,
    SettingsComponent,
    SearchDeckComponent
  ],
  imports: [
    BrowserModule, AlertModule.forRoot(), appRoutes, HttpModule, FormsModule, ReactiveFormsModule, ModalModule, HttpClientModule,
    FormWizardModule, ImageUploadModule.forRoot()
  ],
  entryComponents: [ RememberCardComponent, SingleChoiceQuestionComponent, MapQuestionAnswerComponent],
  providers: [DecksService, AuthenticationService, HeaderBasicService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
