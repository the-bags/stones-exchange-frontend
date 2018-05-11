import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpaceComponent } from './space/space.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

const routes: Routes = [
  { path: 'qoute', component: QuoteComponent },
  { path: 'loginpage', component: LoginpageComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'space', component: SpaceComponent},
  { path: 'registerpage', component: RegisterpageComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
