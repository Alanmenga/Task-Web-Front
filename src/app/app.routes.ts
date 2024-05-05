import { Routes } from '@angular/router';
import { PresentationComponent } from './home/pages/presentation/presentation.component';
import { ContactComponent } from './home/pages/contact/contact.component';
import { PageNotFoundComponent } from './home/shared/errors/page-not-found/page-not-found.component';
import { LoginComponent } from './home/pages/login/login.component';
import { RegisterComponent } from './home/pages/register/register.component';
import { PanelComponent } from './home/pages/panel/panel.component';

export const routes: Routes = [
  { path: '', component: PresentationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'panel', component: PanelComponent },
  { path: '**', component: PageNotFoundComponent },
];
