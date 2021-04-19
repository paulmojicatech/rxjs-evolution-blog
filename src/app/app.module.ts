import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./nested-subscribes/nested-subscribes.module').then(m => m.NestedSubscribesModule)
  }
]

@NgModule({
  imports:      [ BrowserModule,BrowserAnimationsModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
