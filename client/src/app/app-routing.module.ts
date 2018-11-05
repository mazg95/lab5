import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionListComponent } from './session-list/session-list.component'
import { MetricListComponent } from './metric-list/metric-list.component'
import { MealListComponent } from './meal-list/meal-list.component'
import { SessionFormComponent } from './session-form/session-form.component';

const routes: Routes = [
  { path: 'sessions', component: SessionListComponent },
  { path: 'metrics', component: MetricListComponent},
  { path: 'meals', component: MealListComponent},
  { path: 'detail/:id', component: SessionFormComponent },
  { path: 'detail', component: SessionFormComponent },
  { path: '', redirectTo: '/sessions', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}