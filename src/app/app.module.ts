import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, QuoteComponent]
})
export class AppModule { }
