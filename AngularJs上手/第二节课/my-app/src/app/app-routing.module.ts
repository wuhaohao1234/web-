import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoovComponent } from './moov/moov.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'moov', component: MoovComponent },
  { path: '', redirectTo: '/moov', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }