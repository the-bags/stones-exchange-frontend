import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
// import { ComponentsModule } from './ui/components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
     BrowserModule, AppRoutingModule, UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
