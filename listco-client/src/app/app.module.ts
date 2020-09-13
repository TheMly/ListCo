import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpErrorInterceptor} from './shared/interceptor/HttpErrorInterceptor';
import {ErrorHandlerService} from './shared/service/error-handler.service';
import {InformationDialogComponent} from './shared/dialog/information/information-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:5555', options: {} };


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)],
  declarations: [
    AppComponent,
    HeaderComponent,
    InformationDialogComponent,
    ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction: 'ltr'}},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
