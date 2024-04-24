import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './Material/material.module';
import { HomeComponent } from './Components/home/home.component';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/dialog-delete/dialog-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogAddEditComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  entryComponents: [
    DialogAddEditComponent,
    DialogDeleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
