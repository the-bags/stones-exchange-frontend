import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';

import { SocketService } from './services/socket.service';

// import { ComponentsModule } from './ui/components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
     BrowserModule, AppRoutingModule, UiModule, HttpClientModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
