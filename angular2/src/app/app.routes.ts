import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { DeckComponent } from './deck/deck.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { LessonComponent } from './lesson/lesson.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './user/settings.component';
import { SearchDeckComponent } from './header/search_deck.component';
import { DeactivateGuard } from './guards/deactivate-guard';
import { CreateDeckAdvanceComponent } from './create-deck-advance/create-deck-advance.component';

import { AuthGuard } from './guards/auth-guard';

const routing : Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'decks', component: DeckComponent, canActivate: [AuthGuard]},
  {path: 'decks/:id', component: DeckDetailsComponent, canActivate: [AuthGuard]},
  {path: 'decks/:id/edit', component: EditDeckComponent, canActivate: [AuthGuard]},
  {path: 'createDeck', component: CreateDeckComponent, canActivate: [AuthGuard]},
  {path: 'decks/:id/lessons/:id', component: LessonComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard]},
  {path: 'createDeckAdvance', component: CreateDeckAdvanceComponent, canActivate: [AuthGuard]},
  {path: 'decks/:id/lessons/:id', component: LessonComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'users/:id/setting', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchDeckComponent, canActivate: [AuthGuard]}
]

export const appRoutes = RouterModule.forRoot(routing);
