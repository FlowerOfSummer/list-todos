import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { ShowListComponent } from './home/show-list/show-list.component';
import { TestComponent } from './test/test.component';
import { ChildComponent } from './test/child/child.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
    { path: '', redirectTo: 'show-list/all', pathMatch: 'full' },
    {
        path: 'show-list/:tab',
        component: ShowListComponent,
    }
    ]
  },
  {
    path: 'test',
    component: TestComponent,
    children: [{
      path: 'child',
      component: ChildComponent,
    }
    ]
  },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
    declarations: [],
  imports: [
  RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top',
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
