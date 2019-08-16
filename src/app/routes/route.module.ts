import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteRoutingModule } from './route-routing.module';
import { HomeModule } from './home/home.module';
import { TestModule } from './test/test.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [  ],
  imports: [
  TestModule,
  HomeModule,
    CommonModule,
    RouteRoutingModule,
  ]
})
export class RoutesModule { }
