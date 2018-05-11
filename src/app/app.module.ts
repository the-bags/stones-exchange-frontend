import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpaceComponent } from './space/space.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    LoginpageComponent,
    NavbarComponent,
    SpaceComponent,
    RegisterpageComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
