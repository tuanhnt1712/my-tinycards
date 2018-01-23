import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { DeckComponent } from './deck/deck.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';

const routing : Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'decks', component: DeckComponent},
  {path: 'decks/:id', component: DeckDetailsComponent},
  {path: 'createDeck', component: CreateDeckComponent}
]

export const appRoutes = RouterModule.forRoot(routing);
