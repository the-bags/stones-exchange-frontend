import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuoteComponent } from './ui/components/quote/quote.component';
import { LoginpageComponent } from './ui/components/loginpage/loginpage.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { SpaceComponent } from './ui/components/space/space.component';
import { RegisterpageComponent } from './ui/components/registerpage/registerpage.component';

import { ComponentsModule } from './ui/components/components.module';
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
