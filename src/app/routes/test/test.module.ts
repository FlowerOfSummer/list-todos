
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouteRoutingModule } from './../route-routing.module';
import { TestComponent } from './test.component';
import { ChildComponent } from './child/child.component';


@NgModule({
  declarations: [
    TestComponent,
    ChildComponent
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
export class TestModule { }
