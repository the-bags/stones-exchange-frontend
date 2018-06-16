import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuoteComponent } from './quote/quote.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpaceComponent } from './space/space.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [
    QuoteComponent,
    LoginpageComponent,
    NavbarComponent,
    SpaceComponent,
    RegisterpageComponent,
  ],
  exports: [
    QuoteComponent,
    LoginpageComponent,
    NavbarComponent,
    SpaceComponent,
    RegisterpageComponent,
  ]
})
export class ComponentsModule {
   QuoteComponent;
   LoginpageComponent;
   NavbarComponent;
   SpaceComponent;
   RegisterpageComponent;
}
