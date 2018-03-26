import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, CarouselModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-modal';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormWizardModule } from 'angular2-wizard';
import { ImageUploadModule } from "angular2-image-upload";
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app.routes';
import { UserComponent } from './user/user.component';
import { UserFollowDetailComponent } from './user/follow/user.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { DeckComponent } from './deck/deck.component';
import { DecksService } from './services/decks.service';
import { LessonPracticeService } from './services/lesson-practice.service';
import { AuthenticationService } from './services/authentication.service';
import { HeaderBasicService } from './services/base/header-basic.service';
import { HttpModule } from '@angular/http';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { CreateDeckAdvanceComponent } from './create-deck-advance/create-deck-advance.component';
import { TinyEditorComponent } from './card-advance/tiny-editor.compoment';
import { ImportDeckComponent } from './import-deck/import-deck.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { CardComponent } from './card/card.component';
import { CardAdvanceComponent } from './card-advance/card-advance.component';
import { HeaderComponent } from './header/header.component';
import { LessonComponent } from './lesson/lesson.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';

import { LessonContentDirective } from './lesson/lesson-content.directive';
import { RememberCardComponent } from './lesson/remember-card.component';
import { SingleChoiceQuestionComponent } from './lesson/single-choice-question.component';
import { SingleChoiceImageQuestionComponent } from './lesson/single-choice-image-question.component';
import { MapQuestionAnswerComponent } from './lesson/map-question-answer.component';
import { SlickCarouselComponent } from './slick/slick-carousel.component';
import { UserService } from './services/user.service';
import { SettingsComponent } from './user/settings.component';
import { SearchDeckComponent } from './header/search_deck.component';
import { DeactivateGuard } from './guards/deactivate-guard';
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
    ImportDeckComponent,
    EditDeckComponent,
    CardComponent,
    HeaderComponent,
    DialogComponent,
    LessonComponent,
    LessonContentDirective,
    RememberCardComponent,
    SingleChoiceQuestionComponent,
    SingleChoiceImageQuestionComponent,
    MapQuestionAnswerComponent,
    SlickCarouselComponent,
    SettingsComponent,
    SearchDeckComponent,
    CreateDeckAdvanceComponent,
    TinyEditorComponent,
    CardAdvanceComponent
  ],
  imports: [
    BrowserModule, AlertModule.forRoot(), CarouselModule.forRoot(), appRoutes, HttpModule, FormsModule, ReactiveFormsModule, ModalModule, HttpClientModule,
    FormWizardModule, ImageUploadModule.forRoot(), EditorModule
  ],
  entryComponents: [ RememberCardComponent, SingleChoiceQuestionComponent, SingleChoiceImageQuestionComponent,
   MapQuestionAnswerComponent, DialogComponent],
  providers: [DecksService, AuthenticationService, LessonPracticeService, HeaderBasicService, UserService, DialogService, DeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
