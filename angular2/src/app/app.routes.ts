import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routing : Routes = [
  {path: '', component: HomeComponent},
]

export const appRoutes = RouterModule.forRoot(routing);
