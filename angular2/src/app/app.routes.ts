import { Routes, RouterModule } from '@angular/router';
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
import { CreateDeckAdvanceComponent } from './create-deck-advance/create-deck-advance.component';

const routing : Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'decks', component: DeckComponent},
  {path: 'decks/:id', component: DeckDetailsComponent},
  {path: 'decks/:id/edit', component: EditDeckComponent},
  {path: 'createDeck', component: CreateDeckComponent},
  {path: 'createDeckAdvance', component: CreateDeckAdvanceComponent},
  {path: 'decks/:id/lessons/:id', component: LessonComponent},
  {path: 'users/:id', component: UserComponent},
  {path: 'users/:id/setting', component: SettingsComponent},
  {path: 'search', component: SearchDeckComponent}
]

export const appRoutes = RouterModule.forRoot(routing);
