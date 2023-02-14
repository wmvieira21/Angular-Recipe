import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
