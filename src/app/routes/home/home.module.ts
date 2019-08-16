
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouteRoutingModule } from './../route-routing.module';
import { HomeComponent } from './home.component';
import { ShowListComponent } from './show-list/show-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    ShowListComponent,
  ],
  imports: [

  RouteRoutingModule,
  RouterModule,
  BrowserModule,
    FormsModule,
    // DelonMockModule
  ],
  providers: [],
})
export class HomeModule { }
