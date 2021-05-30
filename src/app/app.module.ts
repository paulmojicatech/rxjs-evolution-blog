import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

const routes: Route[] = [
    {
      path: 'subscribes',
      loadChildren: () => import('./subscribes/subscribes.module').then(m => m.SubscribesModule)
    },
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
            import('./behavior-subjects/behavior-subjects.module').then(
                m => m.BehaviorSubjectModule
            ),
    },
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
