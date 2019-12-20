import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ListAllCharactersComponent } from './list-all-characters/list-all-characters.component';
import { DamageCalculatorComponent } from './damage-calculator/damage-calculator.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:ID_CHARACTER', component: CharacterDetailComponent },
  { path: 'list-all-characters', component: ListAllCharactersComponent },
  { path: 'damage-calculator', component: DamageCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }